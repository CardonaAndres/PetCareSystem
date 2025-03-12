import * as VaccinesModel from './model.js';
import * as PetModel from '../pets/model.js'; 
import * as VeterinarianModel from '../veterinarians/model.js';

export const getAllVaccinesByPet = async (req, res) => {
    try {

        const pet = await PetModel.getPetByID(req.params.id, req.user.user_ID);
        if(!pet) 
            return res.status(404).json({ message : 'La mascota NO existe' })

        const { page = 1 } = req.query; 
        const offset = (page - 1) * 21; 
        const totalVaccines = await VaccinesModel.totalVaccinesByPet(pet.pet_ID);
        const vaccines = await VaccinesModel.getAllVaccinesByPet(
            req.user.user_ID, pet.pet_ID, offset
        );

        const totalPages = Math.ceil(totalVaccines / 21);

        return res.status(200).json({
            vaccines,
            pagination: {
                currentPage: parseInt(page),   
                totalPages: totalPages,        
                totalVaccines: totalVaccines,          
            },
            message: "Tarea exitosa"
        });


    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}

export const registerVaccine = async (req, res) => {
    try {
        const { vaccine, veterinarian } = req.body;

        if(!vaccine || !veterinarian)
            return res.status(400).json({ message : 'Faltan datos obligatorios' });

        const { 
            num_doc_veterinarian,
            veterinarian_name,
            phone,
            email = "" 
        } = veterinarian;

        const {
            pet_ID,
            name, 
            application_date,
            next_dose
        } = vaccine;

        if(!num_doc_veterinarian || !veterinarian_name || !phone)
            return res.status(400).json({ message : 'Faltan datos obligatorios del veterinario'});

        if(!pet_ID || !name || !application_date || !next_dose)
            return res.status(400).json({ message : 'Faltan datos obligatorios en la vacuna'});

        const pet = await PetModel.getPetByID(pet_ID, req.user.user_ID);
        if(!pet) return res.status(404).json({ message : 'La mascota no ha sido encontrada' })

        const existVeterinarian = await VeterinarianModel.getVeterinarianByNumDoc(num_doc_veterinarian)

        if(existVeterinarian){
            await VaccinesModel.registerVaccine({
                pet_ID,
                veterinarian_ID : existVeterinarian.veterinarian_ID,
                name,
                application_date,
                next_dose
            });
    
            return res.status(201).json({
                message : 'Información guardada correctamente'
            });
        }
 
       const veterinarian_ID = await VeterinarianModel.registerVeterinarian({
            num_doc_veterinarian, 
            veterinarian_name,
            phone, 
            email
        });

        await VaccinesModel.registerVaccine({
            pet_ID,
            veterinarian_ID,
            name,
            application_date,
            next_dose
        });

        return res.status(201).json({
            message : 'Información guardada correctamente'
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}

export const deleteVaccine = async (req, res) => {
    try {
        const vaccine = await VaccinesModel.getVaccineByID(
           req.user.user_ID, req.params.id
        );

        if(!vaccine) return res.status(404).json({ message : 'Vacuna NO encontrada' });

        await VaccinesModel.deleteVaccine(req.params.id)

        return res.status(200).json({
            message : 'Vacuna eliminada correctamente'
        })


    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}
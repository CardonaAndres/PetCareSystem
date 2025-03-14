import * as VeterinarianModel from '../veterinarians/model.js';
import * as AppointmentModel from './model.js';
import * as PetModel from '../pets/model.js'; 

export const getAllAppointmentsPet = async (req, res) => {
    try {   
        const pet = await PetModel.getPetByID(req.params.id, req.user.user_ID);
        if(!pet) return res.status(404).json({ message : 'La mascota NO existe' })

        const { page = 1 } = req.query; 
        const offset = (page - 1) * 21; 
        const totalAppointments = await AppointmentModel.totalAppointmentsByPet(pet.pet_ID);
        const appointments = await AppointmentModel.getAllAppointmentsPet(
            req.user.user_ID, pet.pet_ID, offset
        );

        const totalPages = Math.ceil(totalAppointments / 21);

        return res.status(200).json({
            appointments,
            pagination: {
                currentPage: parseInt(page),   
                totalPages,        
                totalAppointments      
            },
            message: "Tarea exitosa"
        });

    } catch (err) {

    }
}

export const registerAppointment = async (req, res) => {
    try {
        const { veterinarian, appointments } = req.body;

        if(!appointments || !veterinarian)
            return res.status(400).json({ message : 'Faltan datos obligatorios' });

        const { 
            num_doc_veterinarian,
            veterinarian_name,
            phone,
            email = "" 
        } = veterinarian;

        const {
            pet_ID,
            appointment_date,
            reason
        } = appointments;

        if(!num_doc_veterinarian || !veterinarian_name || !phone)
            return res.status(400).json({ message : 'Faltan datos obligatorios del veterinario'});

        if(!pet_ID || !appointment_date || !reason)
            return res.status(400).json({ message : 'Faltan datos obligatorios de la cita'});

        const pet = await PetModel.getPetByID(pet_ID, req.user.user_ID);
        if(!pet) return res.status(404).json({ message : 'La mascota no ha sido encontrada' })

        const veterinarian_ID = await VeterinarianModel.registerVeterinarian({
            num_doc_veterinarian, 
            veterinarian_name,
            phone, 
            email
        });

        await AppointmentModel.registerAppointment({
            pet_ID,
            veterinarian_ID,
            appointment_date,
            reason
        });

        return res.status(201).json({
            message : 'Cita registrada correctamente'
        });
        

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}

export const deleteAppointment = async (req, res) => {
    try {
        await AppointmentModel.deleteAppointment(req.params.id)
        return res.status(200).json({
            message : 'Cita eliminada correctamente'
        })
    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}
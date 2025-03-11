import * as TypePetModel from './model.js';

export const getAllTypePets = async (req, res) => {
    try {
        const typePets = await TypePetModel.getAllTypePets();
        return res.status(200).json({ typePets });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}

export const createTypePet = async (req, res) => {
    try {
        const { specie, race, description = "" } = req.body;

        if(!specie || !race)
            return res.status(400).json({
                message : 'Raza y especie son obligatorios'
            })

        await TypePetModel.createTypePet({ specie, race, description });

        return res.status(201).json({
            message : 'Tipo de mascota creada correctamente'
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}

export const updateTypePet = async (req, res) => {
    try {
        const { specie, race, description = "" } = req.body;

        if(!specie || !race)
            return res.status(400).json({
                message : 'Raza y especie son obligatorios'
            })

        await TypePetModel.updateTypePet({ 
            specie, 
            race, 
            description, 
            type_pet_ID : req.params.id
        });

        return res.status(200).json({
            message : 'Tipo de mascota editada correctamente'
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}

export const deleteTypePet = async (req, res) => {
    try {
        
        await TypePetModel.deleteTypePet(req.params.id);

        return res.status(200).json({
            message : 'Tipo de mascota eliminada correctamente'
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}
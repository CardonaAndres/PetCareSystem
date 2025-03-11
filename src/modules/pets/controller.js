import fs from 'fs/promises'; 
import path from 'path';
import { fileURLToPath } from 'url';
import { SERVER_URL } from "../../configs/config.js";
import * as PetModel from './model.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

export const getAllPetsPaginate = async (req, res) => {
    try {
        const { page = 1 } = req.query; 
        const offset = (page - 1) * 20; 
        const totalPets = await PetModel.totalPets(req.user.user_ID);
        const pets = await PetModel.getPetsPaginate(req.user.user_ID, offset);
        const totalPages = Math.ceil(totalPets / 20);

        return res.status(200).json({
            pets,
            pagination : {
                currentPage: parseInt(page),
                totalPages,
                totalPets 
            }
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}

export const registerPet = async (req, res) => {
    try {
        const { name, birth_date, type_pet_ID } = req.body;
        const { user_ID } = req.user;

        if(!name || !birth_date || !type_pet_ID)
            return res.status(400).json({ message : 'Todos los datos son obligatorios' });

        if (!req.file) return res.status(400).json({ message : "Por favor, subir la imagen" });
        const photo_url = `${SERVER_URL}/uploads/${req.file.filename}`;

        await PetModel.createPet({
            user_ID, name, birth_date, photo_url, type_pet_ID
        });

        return res.status(201).json({
            message : 'Mascota registrada correctamente'
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}

export const updatePet = async (req, res) => {
    try {
        const pet = await PetModel.getPetByID(req.params.id, req.user.user_ID);

        if(!pet) 
            return res.status(404).json({message : 'La mascota NO ha sido encontrada'});

        const {
            name = pet.name, 
            birth_date = pet.birth_date,
            type_pet_ID = pet.type_pet_ID
        } = req.body;

        if(!name || !birth_date || !type_pet_ID)
            return res.status(400).json({ message : 'Todos los datos son obligatorios' });

        const petData = { name, birth_date, type_pet_ID }
        petData.pet_ID = pet.pet_ID;
        petData.user_ID = req.user.user_ID;

        if (req.file) {
            const newImageUrl = `${SERVER_URL}/uploads/${req.file.filename}`;
            petData.photo_url = newImageUrl;  

            const oldImagePath = pet.photo_url 
            ? path.join(__dirname, '..', '..', 'uploads', pet.photo_url.split('/').pop()) : null;

            if (oldImagePath) {
                try {
                    await fs.access(oldImagePath); 
                    await fs.unlink(oldImagePath); 
                } catch (err) {
                    console.log(err)
                    console.error("No se pudo eliminar la imagen anterior:", err.message);
                }
            }

        } else {
            petData.photo_url = pet.photo_url;  
        }

        await PetModel.updatePet(petData)

        return res.status(200).json({
            message : 'Mascota actualizada correctamente'
        })

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}

export const deletePet = async (req, res) => {
    try {
        const pet = await PetModel.getPetByID(req.params.id, req.user.user_ID);

        if(!pet)
            return res.status(404).json({message : 'La mascota NO ha sido encontrada'});

        if(pet.photo_url){

            const fileName = pet.photo_url.split('/').pop();
            const imagePath = path.join(__dirname, '..', '..', 'uploads', fileName);

            try {
                await fs.access(imagePath);
                await fs.unlink(imagePath);
            } catch (err) {
                console.error('Error al acceder o eliminar la imagen:', err.message);
                return res.status(500).json({ message: 'Error al eliminar la imagen' });
            }
        }

        await PetModel.deletePet(pet.pet_ID, req.user.user_ID);

        return res.status(200).json({
            message : 'Eliminado correctamente'
        })

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}
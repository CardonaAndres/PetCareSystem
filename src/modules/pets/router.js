import express from "express";
import * as PetController from './controller.js';
import upload from '../../configs/multer.js';

const router = express.Router();

router.get('/', PetController.getAllPetsPaginate);
router.post('/pet', upload.single('photo_url'),  PetController.registerPet);
router.put('/pet/:id', upload.single('photo_url'), PetController.updatePet);
router.delete('/pet/:id',  PetController.deletePet);

export default router;
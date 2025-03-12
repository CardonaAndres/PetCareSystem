import express from "express";
import * as VaccineController from './controller.js';

const router = express.Router();

router.get('/:id/', VaccineController.getAllVaccinesByPet);
router.post('/', VaccineController.registerVaccine);
router.delete('/:id', VaccineController.deleteVaccine);

export default router;
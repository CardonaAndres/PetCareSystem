import express from "express";
import * as TypePetController from './controller.js';
import { checkRole } from "../../middlewares/checkRole.js";

const router = express.Router();

router.get('/', TypePetController.getAllTypePets);
router.post('/', checkRole([ 1 ]), TypePetController.createTypePet);
router.put('/:id', checkRole([ 1 ]), TypePetController.updateTypePet);
router.delete('/:id', checkRole([ 1 ]), TypePetController.deleteTypePet);

export default router;

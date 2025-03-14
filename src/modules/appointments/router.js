import express from "express";
import * as AppointmentController from './controller.js';

const router = express.Router();

router.get('/:id/', AppointmentController.getAllAppointmentsPet);
router.post('/appointment', AppointmentController.registerAppointment)
router.delete('/appointment/:id', AppointmentController.deleteAppointment)

export default router;
import express from "express";
import * as ClientController from './controller.js';

const router = express.Router();

router.get('/profile', ClientController.profile);
router.put('/user', ClientController.update);
router.delete('/user', ClientController.deleteAccount);

export default router;
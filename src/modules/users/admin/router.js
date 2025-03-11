import express from "express";
import * as AdminController from './controller.js';

const router = express.Router();

router.get('/', AdminController.getAllUsers);
router.put('/change-role', AdminController.changeRole);

export default router;

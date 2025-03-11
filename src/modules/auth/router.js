import express from "express";
import * as AuthController from './controller.js';

const router = express.Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

export default router;
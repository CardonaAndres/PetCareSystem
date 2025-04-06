import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from '../modules/auth/router.js';
import PetsRouter from '../modules/pets/router.js';
import PostsRouter from '../modules/posts/router.js';
import ClientRouter from '../modules/users/client/router.js';
import AdminRouter from '../modules/users/admin/router.js';
import TypePetsRouter from '../modules/typePets/router.js';
import VaccinesRouter from '../modules/vaccines/router.js';
import AppoinmentsRouter from '../modules/appointments/router.js';
import { fileURLToPath } from 'url';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkRole } from '../middlewares/checkRole.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,  
    methods: ['GET', 'POST', 'PUT', 'DELETE'] 
}));

app.use('/API/auth', AuthRouter);
app.use('/API/pets', authMiddleware, PetsRouter);
app.use('/API/users', authMiddleware, ClientRouter);
app.use('/API/type-pets', authMiddleware, TypePetsRouter);
app.use('/API/vaccines', authMiddleware, VaccinesRouter);
app.use('/API/appointments', authMiddleware, AppoinmentsRouter);
app.use('/API/posts', authMiddleware, PostsRouter);

app.use('/API/admin/users', authMiddleware, checkRole([ 1 ]), AdminRouter);

export default app;
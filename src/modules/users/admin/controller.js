import * as AdminModel from './model.js';
import * as AuthModel from '../../auth/model.js';
import validator from 'validator';

export const getAllUsers = async (req, res) => {
    try {
        const { page = 1 } = req.query; 
        const offset = (page - 1) * 12; 
        const totalUsers = await AdminModel.totalUsers(); 
        const users = await AdminModel.getUsersPaginate(offset);
        const totalPages = Math.ceil(totalUsers / 12);

        users.map(user => delete user.password);

        return res.status(200).json({
            users,
            pagination: {
                currentPage: parseInt(page),   
                totalPages: totalPages,        
                totalUsers: totalUsers,          
            },
            message: "Tarea exitosa"
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        });
    }
}

export const changeRole = async (req, res) => {
    try {
        const { email, role_ID = 2 } = req.body;
        if(!validator.isEmail(email)) return res.status(400).json({ message : 'Correo no valido' });

        const user = await AuthModel.getUserByEmail(email);

        if(!user) return res.status(404).json({
            message : 'El usuario no ha sido encontrado'
        });

        await AdminModel.changeRole(role_ID, user.user_ID, email)

        return res.status(200).json({
            message : 'Rol actualizado correctamente'
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        });
    }
}
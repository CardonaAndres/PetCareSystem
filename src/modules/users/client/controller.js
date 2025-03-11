import validator from 'validator';
import * as AuthModel from '../../auth/model.js';
import * as ClientModel from './model.js';
import { nameRegex, colombianPhoneRegex } from '../../../configs/config.js';

export const profile = async (req, res) => {
    try {
        const profile = await AuthModel.getUserByEmail(req.user.email);

        if(!profile) return res.status(404).json({
            message : 'Usuario NO encontrado'
        });

        delete profile.password;

        return res.status(200).json({
            profile
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        });
    }
}

export const update = async (req, res) => {
    try {
        const profile = await AuthModel.getUserByEmail(req.user.email);

        if(!profile) return res.status(404).json({
            message : 'Usuario NO encontrado'
        });

        const {
            name = profile.profile, 
            email = profile.email, 
            phone = profile.phone
        } = req.body;

        if(!validator.isEmail(email)) return res.status(400).json({ message : 'Correo no valido' });

        if (!nameRegex.test(name)) 
            return res.status(400).json({ message : 'El nombre contiene caracteres no válidos. Solo se permiten letras, espacios, acentos y guiones' })

        if (!colombianPhoneRegex.test(phone)) 
            return res.status(400).json({ message : 'El número de teléfono no es válido. Debe ser un número de celular colombiano de 10 dígitos y empezar con 3' })

        const isEmailInUse = await AuthModel.getUserByEmail(email);

        if(isEmailInUse && isEmailInUse.user_ID !== req.user.user_ID)
            return res.status(400).json({ message : 'Email en uso' })

        const isPhoneInUse = await ClientModel.getUserByPhone(phone)
        
        if(isPhoneInUse && isPhoneInUse.user_ID !== req.user.user_ID)
            return res.status(400).json({ message : 'Celular en uso' })

        await ClientModel.update({
            user_ID : req.user.user_ID,
            name, 
            email,
            phone
        });

        return res.status(200).json({
            message : 'Actualizado correctamente'
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        await ClientModel.deleteAccount(req.user.user_ID);
        res.clearCookie('token');
        return res.status(200).json({
            message : 'Tu cuenta ha sido borrada correctamente'
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        });
    }
}
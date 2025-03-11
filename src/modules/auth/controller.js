import * as AuthModel from './model.js';
import bcrypt from "bcrypt";
import validator from 'validator';
import { nameRegex, colombianPhoneRegex, passwordRegex } from '../../configs/config.js';
import { createTokenAccess } from '../../libs/jwt.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const user = await AuthModel.getUserByEmail(email);

        if(user) return res.status(400).json({ message : 'Usuario ya registrado' })
        if(!validator.isEmail(email)) return res.status(400).json({ message : 'Correo no valido' })

        if (!nameRegex.test(name)) 
            return res.status(400).json({ message : 'El nombre contiene caracteres no válidos. Solo se permiten letras, espacios, acentos y guiones' })

        if (!colombianPhoneRegex.test(phone)) 
            return res.status(400).json({ message : 'El número de teléfono no es válido. Debe ser un número de celular colombiano de 10 dígitos y empezar con 3' })

        if (!passwordRegex.test(password)) 
            return res.status(400).json({ message : 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un símbolo especial' })

        const passwordHash = await bcrypt.hash(password, 10);

        await AuthModel.registerUser({
            name, 
            email,
            phone,
            password : passwordHash,
            role_ID : 2
        });

        const token = await createTokenAccess({ name, email, phone, role_ID : 2 });

        res.cookie('token', token, {
            httpOnly : true,
            secure: false,        // La cookie solo se envía a través de HTTPS
            sameSite: 'none',  
            maxAge: 3600000,     // La cookie expira en 1 hora (valor en milisegundos)
            path: '/',           // Ruta en la que la cookie es válida
        });

        return res.status(201).json({
            message : 'Usuario registrado correctamente', user : {
                name, 
                email,
                phone,
                role_ID : 2
            },token 
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!validator.isEmail(email)) return res.status(400).json({ message : 'Correo no valido' })

        if (!passwordRegex.test(password)) 
            return res.status(400).json({ message : 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un símbolo especial' })

        const user = await AuthModel.getUserByEmail(email);
        if(!user) throw new Error('El usuario NO ha sido encontrado')

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) 
            return res.status(400).json({ message : 'Contraseña Incorrecta' });

        delete user.password;
        const token = await createTokenAccess({ ...user });

        res.cookie('token', token, {
            httpOnly : true,
            secure: false,        // La cookie solo se envía a través de HTTPS
            sameSite: 'none',  
            maxAge: 3600000,     // La cookie expira en 1 hora (valor en milisegundos)
            path: '/',           // Ruta en la que la cookie es válida
        });

        return res.status(200).json({
             message : 'Sesión Iniciada Correctamente',
             user, token
        });

    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message : 'Sesión cerrada correctamente' })
    } catch (err) {
        return res.status(500).json({
            message : err.message || 'Internal Server Error'
        })
    }
}
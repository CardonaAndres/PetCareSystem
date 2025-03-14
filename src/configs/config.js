export const PORT = process.env.PORT || 5010;
export const SECRET_KEY = process.env.SECRET_KEY || 'Sena2025';

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
export const colombianPhoneRegex = /^3[0-9]{9}$/;
export const nameRegex = /^[a-zA-ZÀ-ÿ\s\-]+$/; 
export const isProduction = false;

export const SERVER_URL = isProduction ? '' : 'http://localhost:5010'

export const database_credentials = {
    host : 'host.docker.internal',
    user : 'root',
    password : '',
    database : 'pets_db',
    port : 3306
}
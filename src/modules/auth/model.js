import { connDataBase } from "../../utils/database.js";

const conn = await connDataBase();

export const getUserByEmail = async (email) => {
    const [ user ] = await conn.query('SELECT * FROM users WHERE email = ?',[email]);
    return user[0];
}

export const registerUser = async (userData) => {
    const { name, email, phone, password, role_ID = 2 } = userData;
    await conn.query('INSERT INTO users (name, email, phone, password, role_ID) VALUES (?, ?, ?, ?, ?)',[ name, email, phone, password, role_ID ]);
}
import { connDataBase } from "../../../utils/database.js";

const conn = await connDataBase();

export const getUserByPhone = async (phone) => {
    const [ user ] = await conn.query(`SELECT * FROM users WHERE phone = ?`, [phone]);
    return user[0]
}

export const update = async (userData) => {
    const { user_ID, name, email, phone } = userData;
    await conn.query('UPDATE users SET name = ?, email = ?, phone = ? WHERE user_ID = ?', [
        name, email, phone, user_ID
    ])
}

export const deleteAccount = async (user_ID) => {
    await conn.query('DELETE FROM users WHERE user_ID = ?', [user_ID]);
}
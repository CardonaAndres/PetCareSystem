import { connDataBase } from "../../../utils/database.js";

const conn = await connDataBase();

export const getUsersPaginate = async (offset) => {
    const [ users ] = await conn.query(`SELECT u.*, r.role_name FROM users u INNER JOIN roles r ON u.role_ID = r.role_ID LIMIT 12 OFFSET ?`, [offset]);
    return users;
}

export const totalUsers = async () => {
    const [ users ] = await conn.query(`SELECT COUNT(*) AS total FROM users`);
    return users[0].total;  
}

export const changeRole = async (role_ID, user_ID, email) => {
    await conn.query('UPDATE users set role_ID = ? WHERE user_ID = ? AND email = ?', [
        role_ID, user_ID, email
    ]);
}
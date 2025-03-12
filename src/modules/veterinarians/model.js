import { connDataBase } from "../../utils/database.js";

const conn = await connDataBase();

export const getVeterinarianByNumDoc = async (numDoc) => {
    const [ veterinarian ] = await conn.query( 
        `SELECT * FROM veterinarians WHERE num_doc_veterinarian = ? `,  [ numDoc ]
    );

    return veterinarian[0]
}

export const registerVeterinarian = async (data) => {
    const { num_doc_veterinarian, veterinarian_name, phone, email } = data;

    const [ result ] = await conn.query( 
        `INSERT INTO veterinarians (num_doc_veterinarian, veterinarian_name, phone, email) 
        VALUES (?, ?, ?, ?)`,  [ num_doc_veterinarian, veterinarian_name, phone, email ]
    );

    return result.insertId;
}
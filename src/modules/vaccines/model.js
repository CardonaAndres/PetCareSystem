import { connDataBase } from "../../utils/database.js";

const conn = await connDataBase();

export const getAllVaccinesByPet = async (user_ID, pet_ID, offset) => {
    const [ vaccines ] = await conn.query(
        `SELECT tp.specie, tp.race, tp.description, p.*, vt.* , v.name, v.application_date,
         v.next_dose FROM type_pets tp INNER JOIN pets p ON tp.type_pet_ID = p.type_pet_ID
         INNER JOIN vaccines v ON p.pet_ID = v.pet_ID  INNER JOIN veterinarians vt 
         ON v.vaccine_ID = vt.veterinarian_ID 
         WHERE p.user_ID = ? AND p.pet_ID = ? LIMIT 21 OFFSET ?`, [user_ID, pet_ID, offset]
    );

    return vaccines;
}

export const getVaccineByID = async (user_ID, vaccine_ID) => {
    const [ vaccines ] = await conn.query(
        `SELECT tp.specie, tp.race, tp.description, p.*, vt.* , v.name, v.application_date,
         v.next_dose FROM type_pets tp INNER JOIN pets p ON tp.type_pet_ID = p.type_pet_ID
         INNER JOIN vaccines v ON p.pet_ID = v.pet_ID  INNER JOIN veterinarians vt 
         ON v.vaccine_ID = vt.veterinarian_ID WHERE p.user_ID = ? AND v.vaccine_ID = ?`, 
         [user_ID, vaccine_ID]
    );

    return vaccines[0];
}

export const totalVaccinesByPet = async (pet_ID) => {
    const [ users ] = await conn.query(
        `SELECT COUNT(*) AS total FROM vaccines WHERE pet_ID = ?`, [pet_ID]
    );
    return users[0].total;  
}


export const registerVaccine = async (data) => {
    const { 
        pet_ID, 
        veterinarian_ID,
        name,
        application_date,
        next_dose
    } = data;

    await conn.query(
        `INSERT INTO vaccines (pet_ID, veterinarian_ID, name, application_date, next_dose) 
        VALUES (?, ?, ?, ?, ?)`, [pet_ID, veterinarian_ID, name, application_date, next_dose]
    )
}

export const deleteVaccine = async (vaccine_ID) => {
    await conn.query('DELETE FROM vaccines WHERE vaccine_ID = ?', [vaccine_ID])
}
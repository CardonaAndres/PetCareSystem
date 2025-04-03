import { connDataBase } from "../../utils/database.js";

const conn = await connDataBase();

export const getAllAppointmentsPet = async (user_ID, pet_ID, offset) => {
    const [ vaccines ] = await conn.query(
        `SELECT p.*, ap.appointment_date, ap.appointment_ID, ap.reason, ap.created_at, v.* 
        FROM pets p INNER JOIN appointments ap ON p.pet_ID = ap.pet_ID
        INNER JOIN veterinarians v ON ap.veterinarian_ID = v.veterinarian_ID
        WHERE p.user_ID = ? AND p.pet_ID = ? LIMIT 21 OFFSET ?`, [user_ID, pet_ID, offset]
    );

    return vaccines;
}

export const getAppointmentyID = async (user_ID, veterian_ID ) => {
    const [ vaccines ] = await conn.query(
        `SELECT p.*, ap.appointment_date, appointments.reason, ap.created_at, v.* FROM pets p 
         INNER JOIN appointments ap ON p.pet_ID = ap.pet_ID
         INNER JOIN veterinarians v ON ap.veterinarian_ID = v.veterinarian_ID
         WHERE p.user_ID = ? AND v.veterian_ID = ?`, 
         [user_ID, veterian_ID ]
    );

    return vaccines[0];
}

export const totalAppointmentsByPet = async (pet_ID) => {
    const [ users ] = await conn.query(
        `SELECT COUNT(*) AS total FROM appointments WHERE pet_ID = ?`, [pet_ID]
    );
    return users[0].total;  
}

export const registerAppointment = async (data) => {
    const { pet_ID, veterinarian_ID, appointment_date, reason } = data;
    await conn.query(
        `INSERT INTO appointments (pet_ID, veterinarian_ID, appointment_date, reason) 
        VALUES (?, ?, ?, ?)`, [ pet_ID, veterinarian_ID, appointment_date, reason ]
    );
}

export const deleteAppointment = async (appointment_ID) => {
    await conn.query('DELETE FROM appointments WHERE appointment_ID = ?',[ appointment_ID ])
}
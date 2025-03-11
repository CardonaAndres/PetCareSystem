import { connDataBase } from "../../utils/database.js";

const conn = await connDataBase();

export const getPetsPaginate = async (user_ID, offset) => {
    const [ pets ] = await conn.query(
        'SELECT tp.specie, tp.race, tp.description, p.* FROM type_pets tp INNER JOIN pets p ON tp.type_pet_ID = p.type_pet_ID WHERE p.user_ID = ? LIMIT 20 OFFSET ?', [ user_ID, offset ]
    )

    return pets;
}

export const getPetByID = async (pet_ID, user_ID) => {
    const [ pet ] = await conn.query(
        'SELECT tp.specie, tp.race, tp.description, p.* FROM type_pets tp INNER JOIN pets p ON tp.type_pet_ID = p.type_pet_ID WHERE p.user_ID = ? AND p.pet_ID = ?', [user_ID, pet_ID]
    )

    return pet[0];
}

export const totalPets = async (user_ID) => {
    const [ pets ] = await conn.query(
        `SELECT COUNT(*) AS total FROM pets WHERE user_ID = ?`, [ user_ID ]
    );
    return pets[0].total;  
}

export const createPet = async (petData) => {
    const { user_ID, name, birth_date, photo_url, type_pet_ID } = petData
    await conn.query(
        `INSERT INTO pets (user_ID, name, birth_date, photo_url, type_pet_ID) VALUES (?, ?, ?, ?, ?)`,[
        user_ID, name, birth_date, photo_url, type_pet_ID
    ]);
}

export const updatePet = async (petData) => {
    const { pet_ID, user_ID, name, birth_date, photo_url, type_pet_ID } = petData;
    await conn.query(
        `UPDATE pets SET name = ?, birth_date = ?, photo_url = ?, type_pet_ID = ?
         WHERE pet_ID = ? AND user_ID = ?`, 
        [ name, birth_date, photo_url, type_pet_ID, pet_ID, user_ID  ]
    )
}

export const deletePet = async (pet_ID, user_ID) => {
    await conn.query('DELETE FROM pets WHERE pet_ID = ? AND user_ID = ?',[
        pet_ID, user_ID
    ]);
}
import { connDataBase } from "../../utils/database.js";

const conn = await connDataBase();

export const getAllTypePets = async () => {
    const [ typePets ] = await conn.query('SELECT * FROM type_pets');
    return typePets;
}

export const createTypePet = async (data) => {
    const { specie, race, description } = data;

    await conn.query('INSERT INTO type_pets (specie, race, description) VALUES (?, ?, ?) ',[
        specie, race, description
    ]);
}

export const updateTypePet = async (data) => {
    const { specie, race, description, type_pet_ID } = data;
    await conn.query(
        'UPDATE type_pets SET specie = ?, race = ?, description = ? WHERE type_pet_ID = ?',[
            specie, race, description, type_pet_ID
        ]
    )
}

export const deleteTypePet = async (type_pet_ID) => {
    await conn.query('DELETE FROM type_pets WHERE type_pet_ID = ?', [type_pet_ID])
}
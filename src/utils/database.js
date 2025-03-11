import mysql2 from 'mysql2/promise';
import { database_credentials } from '../configs/config.js';

export const connDataBase = async () => {
    try {
        const conn = mysql2.createPool(database_credentials);
        return conn;
    } catch (err) {
        console.error("Error creating the database pool:", err);  
        throw new Error("Failed to create database connection pool."); 
    }
}
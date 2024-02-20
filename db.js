//dotenv nos permite leer las variables de entorno de nuestro .env
const dotenv = require("dotenv");
dotenv.config();

const mysql = require('mysql');
let db;

try {
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    });
} catch (error) {
    console.log("Error al conectar con la base de datos");
}

module.exports = {db};
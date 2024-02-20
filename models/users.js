const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const {db} = require("../db.js");

db.connect((err) => {
    if (err) throw err;
    console.log('Conexión exitosa a la base de datos MySQL');
  });


/*const getAll = () => {
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM users', (err, rows) => {
            resolve.rows
        });
    });
};*/

const getAll = (request, response) => {
    db.query("SELECT * FROM users", 
    (error, results) => {
        if(error)
            throw error;
        console.log(results)
            return results
    });
};

module.exports = {
    getAll:getAll
}
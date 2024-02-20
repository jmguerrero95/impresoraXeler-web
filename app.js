const express = require('express');
const cors = require('cors');
const app = express()

const puerto = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

require('dotenv').config()
require('./db');
app.use('/api', require('./routes/users'));

app.use(cors());

app.listen(puerto, ()=>{
    console.log(`Server on port ${puerto}`)
  });

module.exports = app;
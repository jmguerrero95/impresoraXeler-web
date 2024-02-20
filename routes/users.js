const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');
const dotenv = require("dotenv");
dotenv.config();
const {db} = require("../db.js");
const middleware = require('./middleware.js');

const createToken = (user) => {
    let payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, process.env.TOKEN_KEY);
};

const login = (request, response) =>{
    const user = request.body.username;
    db.query("SELECT * FROM users WHERE username = '"+user+"'", (error, results) =>{
        if(error)
            throw error;
        //console.log(results[0].id)
        //response = json(results);
        if(results[0] === undefined){
            response.json({
                error: 'Error, usuario o contraseña incorrectos'
            })
        }
        const equals = bcrypt.compareSync(request.body.password, results[0].password);
        if(!equals) {
            response.json({
                error: 'Error, usuario o contraseña incorrectos'
            })
        } else {
            response.json({
                succesfull: createToken(results[0]),
                done: 'Login Correct'
            });
        }
    });
}

const getUser = (request, response) =>{
    const id = request.userId;
    db.query("SELECT * FROM users WHERE id = '"+id+"'", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results)
    });
};



//LOGICA RUTAS CLIENTE
const getClients = (request, response) =>{
    db.query("SELECT * FROM clientes WHERE activo = 1", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results)
    });
};

const getClientsById = (request, response) =>{
    const id = request.body.userId;
    db.query("SELECT * FROM clientes WHERE id = '"+id+"'", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results)
    });
};

const getClientsByName = (request, response) =>{
    const name = request.body.userName;
    db.query("SELECT * FROM clientes WHERE name LIKE %'"+name+"%'", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results)
    });
};

const clientsEditName = (request, response) =>{
    const name = request.body.userName;
    const id = request.body.id;
    db.query("update clientes set name='"+name+"' where id='"+id+"'", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const deleteClients = (request, response) =>{
    const id = request.body.id;
    db.query("update clientes set activo='0' where id='"+id+"'", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//FIN LOGICA RUTAS CLIENTE





//LOGICA RUTAS USUARIO
const getUsers = (request, response) =>{
    db.query("SELECT * FROM users WHERE activo = 1", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results)
    });
};

const getUsersById = (request, response) =>{
    const id = request.body.userId;
    db.query("SELECT * FROM users WHERE id = '"+id+"'", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results)
    });
};

const getUsersByName = (request, response) =>{
    const name = request.body.userName;
    db.query("SELECT * FROM users users name LIKE %'"+name+"%'", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results)
    });
};

const aggUsers = (request, response) =>{
    const nombre = request.body.nombre;
    const user = request.body.user;
    const password = request.body.password;
    const pass_hash = bcrypt.hashSync(password, 10);
    const idLocal = request.body.idLocal;
    if(idLocal == 1){
        const direccion = 'Calle 100';
    }else{
        const direccion = 'Pasadena';
    }
    const fecha = moment().format();
    db.query("INSERT INTO users(name, username, password, local_id, direccion, created_at, updated_at) values('"+nombre+"', '"+user+"', '"+pass_hash+"', '"+idLocal+"', '"+direccion+"', '"+fecha+"')", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const usersEditName = (request, response) =>{
    const name = request.body.userName;
    const id = request.body.id;
    db.query("update users set name='"+name+"' where id='"+id+"'", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const deleteUsers = (request, response) =>{
    const id = request.body.id;
    db.query("update users set activo='0' where id='"+id+"'", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//FIN LOGICA RUTAS USUARIO



//LOGICA RUTAS FACTURAS CRIPTO
const getFacturasCripto = (request, response) =>{
    db.query("SELECT * FROM facturas WHERE activo = 1", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results)
    });
};

const deleteFacturasCripto = (request, response) =>{
    const id = request.body.id;
    db.query("update facturas set activo='0' where id='"+id+"'", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//FIN LOGICA RUTAS FACTURAS CRIPTO



//LOGICA RUTAS FACTURAS CAJA
const getFacturasCaja = (request, response) =>{
    db.query("SELECT * FROM facturasCaja WHERE activo = 1", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results)
    });
};

const deleteFacturasCaja = (request, response) =>{
    const id = request.body.id;
    db.query("update facturasCaja set activo='0' where id='"+id+"'", (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//FIN LOGICA RUTAS FACTURAS CRIPTO







router.post('/login', login);
router.use(middleware.checkToken);

//RUTAS CLIENTE
router.get('/getUser', getUser);
//router.get('/', getAll);
router.get('/getClients', getClients);
router.post('/getClientsById', getClientsById);
router.post('/getClientsByName', getClientsByName);
router.post('/clientsEditName', clientsEditName);
router.post('/deleteClients', deleteClients);
//FIN RUTAS CLIENTE

//RUTAS USUARIO
router.get('/getUsers', getUsers);
router.post('/aggUsers', aggUsers);
router.post('/getUsersById', getUsersById);
router.post('/getUsersByName', getUsersByName);
router.post('/usersEditName', usersEditName);
router.post('/deleteUsers', deleteUsers);
//FIN RUTAS USUARIO

//RUTAS FACTURAS CRIPTO
router.get('/getFacturasCripto', getFacturasCripto);
router.post('/deleteFacturasCripto', deleteFacturasCripto);
//FIN RUTAS FACTURAS CRIPTO

//RUTAS FACTURAS CAJA
router.get('/getFacturasCaja', getFacturasCaja);
router.post('/deleteFacturasCaja', deleteFacturasCaja);
//FIN FACTURAS CAJA


module.exports = router;
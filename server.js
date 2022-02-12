const express = require('express');
const moment = require('moment');
const axios = require('axios');
const chalk = require('chalk');
const app = express();
const uuid = require('uuid');

let usuarios;

app.get('/', (res, req) => {
    res.end('lista de usuario')
});


async function getdatosUsuarios(usuarios) {

    let retorno = [];

    for (usuario of usuarios) {
        let tiempo = moment().format('MMMM Do YYYY, hh:MM:SS a');
        let id = uuid.v4();
        id = id.substr(id.length - 6);
        retorno.push(chalk.blue.bgWhite(`Nombre:${usuario.name.first} - Apellido: ${usuario.name.last} - ID: ${id} - Timestamp: ${tiempo}`));
    }

    return retorno;

}

app.listen(3003, async() => {

    usuarios = await axios.get("https://randomuser.me/api/?results=10");

    usuarios = usuarios.data.results;
    usuarios = getdatosUsuarios(usuarios);

    console.log(usuarios);

    console.log("Escuchando en el puerto 3002");
    console.log(chalk.blue.bgWhite("Ejemplo de identificador único", uuid.v4()));
});
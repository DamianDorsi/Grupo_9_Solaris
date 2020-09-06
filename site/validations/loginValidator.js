const { check, validationResult, body } = require('express-validator')
const fs = require('fs')
const path = require('path')

let users = require("../data/usersDataBase")

module.exports = [
    body('nombre').custom(function(value){
        for(let i = 0; i<users.length; i++){
            if((users[i].nombre== value) || (users[i].email == value)) {
                return true
            } 
        }
        return false
    }).withMessage('El email o usuario no esta registrado en nuestra base de datos'),
    check('password')
        .isLength({min:6}).withMessage('La contraseña debe tener como minimo 6 caracteres')
]
const { check, validationResult, body } = require('express-validator')
const fs = require('fs')
const path = require('path')

let users = require("../data/usersDataBase")

module.exports = [
    check('nombre')
        .isAlpha().withMessage('El usuario solo puede contener letras')
        .isLength({min:4, max:10}).withMessage('El usuario debe tener como minimo 4 caracteres y maximo 10 caracteres'),
    body('nombre').custom(function(value){
        for(let i = 0; i<users.length; i++){
            if((users[i].nombre).toLowerCase().trim() == value.toLowerCase().trim()){
                return false
            } 
        }
        return true
    }).withMessage('El nombre de usuario ya esta en uso'),
    check('email')
        .isEmail().withMessage('El formato de email es inavlido'),
    body('email').custom(function(value){
        for(let i = 0; i<users.length; i++){
            if((users[i].email).toLowerCase().trim() == value.toLowerCase().trim()){
                return false
            } 
        }
        return true
    }).withMessage('El email ya esta registrado'),
    check('password')
        .isLength({min:6}).withMessage('La contraseña debe tener como minimo 6 caracteres'),

]
const users = require("../data/usersDataBase")
const fs = require('fs')
const path = require('path')
const bcrypt = require ("bcrypt")
const {check,validationResult,body} = require('express-validator')

const ultimoId = function (array) {
  let ultimoId
  array.forEach(elemento => {
      ultimoId = elemento.id
  })
  return ultimoId + 1
}



module.exports={
    users:function(req, res, next) {
        res.render('user', { title: 'Usuario' });
      },
      register: (req, res, next) => {
        let errors = validationResult(req)
        // SI HAY ERRORES, RETORNALE LA VISTA REGISTRO CON LOS ERRORES QUE COMETIÓ
        if (!errors.isEmpty()) {
            return res.render('user', {
                title: 'usuario',
                errorsReg: errors.errors
            })
        }
        // SI NO COMETIO ERRORES, GUARDA EL USUARIO EN LA BASE DE DATOS
        let usuario = {
            id: ultimoId(users),
            nombre: req.body.nombre.trim(),
            email: req.body.email.trim(),
            password:bcrypt.hashSync(req.body.password,10) 
        }

            users.push(usuario);
            usersJSON = JSON.stringify(users)

            fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json'), usersJSON)

            res.redirect('/users')

        },
        login: (req, res, next) => {
          let errors = validationResult(req)
          // CHEQUEO QUE NO HAYA ERRORES DE VALIDACION
          if (!errors.isEmpty()) {
              return res.render('user', {
                  title: 'usuario',
                  errorsLog: errors.errors
              })
          }
          // RECORRO LOS USUARIOS Y SI COINCIDEN EMAIL o USUARIO Y PASS CON LO QUE ESTA EN LA DB, INICIO SESSION!
          for (let index = 0; index < users.length; index++) {
              if((req.body.nombre == users[index].nombre || req.body.nombre == users[index].email ) && bcrypt.compareSync(req.body.password, users[index].password)){
                  res.render('perfil', {
                      title: "Perfil",
                       user:(users[index].nombre).replace(/\b\w/g, l => l.toUpperCase())
                    })
              }             
          }
          // SI NO SE INICIO SESION, MANDO ESTE ERROR
          res.render('user', {
              title: 'usuario',
              errorsLog: [{msg: 'El usuario y contraseña no coinciden'}]
          })

      },
      perfil:function(req,res,next){
        res.render('perfil', { 
            title: 'perfil',
            user:""

         });
      },
      admin:function(req,res,next){
        let idUser = req.params.id;
        let show = req.params.show
        let usersTotales= users
        let resultado = users.filter(user =>{
            return user.id == idUser
        })
        res.render("adminUsers",{
            title: "Administracion de Usuarios",
            user: resultado[0],
            total: users.length,
            show: show,
            usersTotales: usersTotales
        })
      },
      editar: (req, res) => {
        users.forEach(user => {
            if (user.id == req.params.id){
              user.nombre = req.body.nombre.trim(),
              user.category= req.body.category.trim(),
              user.image = (req.files[0]?req.files[0].filename:user.image)
            }
        })
        usersJSON = JSON.stringify(users)

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json') , usersJSON)

        res.redirect('/users/admin/' + req.params.id)
  }

     
}
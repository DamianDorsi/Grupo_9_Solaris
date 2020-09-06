var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path')
const registerValidator = require('../validations/registerValidator')
const loginValidator = require('../validations/loginValidator')

let Controller = require("../controllers/usersController")

/* configuracion multer para subir imagenes */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'public', 'images' , "users"))
    },
    filename: function (req, file, cb) {
    //          image-2020188115554849.jpeg
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


// ---- ARRANCAN LAS RUTAS -------
router.get('/', Controller.users);
router.post('/registro',registerValidator,Controller.register)
router.post('/login',loginValidator, Controller.login)
router.get("/perfil", Controller.perfil)


router.get("/admin/:id", Controller.admin)



module.exports = router;
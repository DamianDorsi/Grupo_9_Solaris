var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path')

let Controller = require("../controllers/productosController")

/* configuracion multer para subir imagenes */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'public', 'images' , "productos"))
    },
    filename: function (req, file, cb) {
    //          image-2020188115554849.jpeg
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


// ---- ARRANCAN LAS RUTAS -------
router.get('/', Controller.listar);
router.get("/detalle/:id", Controller.detalle)
router.get('/guitarras/:id?', Controller.guitarras);
router.get('/bajos', Controller.bajos);
router.get('/baterias', Controller.baterias);
router.get('/accesorios', Controller.accesorios);

router.get('/agregar', Controller.formAgregar);
router.post('/agregar', upload.any(), Controller.agregarProducto)

router.get('/editar/:id', Controller.formEditar)
router.put('/editar/:id', upload.any(),Controller.editar)

router.delete('/delete/:id', Controller.eliminar)


router.get("/admin/:id", Controller.admin)


module.exports = router;

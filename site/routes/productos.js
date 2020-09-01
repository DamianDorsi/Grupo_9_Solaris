var express = require('express');
const { request } = require('../app');
var router = express.Router();

const Controller = require("../controllers/productosController")

/* paginas de productos. */
router.get('/', Controller.listar);
router.get("/detalle/:id", Controller.detalle)
router.get('/guitarras/:id?', Controller.guitarras);
router.get('/bajos', Controller.bajos);
router.get('/baterias', Controller.baterias);
router.get('/accesorios', Controller.accesorios);
router.get('/agregarProducto', Controller.agregar);

module.exports = router;

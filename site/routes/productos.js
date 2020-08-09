var express = require('express');
const { request } = require('../app');
var router = express.Router();

let Controller = require("../controllers/productosController")

/* paginas de productos. */
router.get('/', Controller.producto);
router.get('/guitarras', Controller.guitarras);
router.get('/bajos', Controller.bajos);
router.get('/baterias', Controller.baterias);
router.get('/accesorios', Controller.accesorios);
router.get('/agregar', Controller.agregar);

module.exports = router;

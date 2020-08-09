var express = require('express');
var router = express.Router();

let Controller = require("../controllers/carritoController")

/* pagina carrito. */
router.get('/', Controller.carrito);

module.exports = router;
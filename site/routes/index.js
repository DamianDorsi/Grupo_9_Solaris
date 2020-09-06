var express = require('express');
var router = express.Router();

let Controller = require("../controllers/indexController")

/* pagina home. */
router.get('/', Controller.index);
router.get("/search", Controller.search)

router.get('/quienesSomos', Controller.quienesSomos);
router.get('/sucursales', Controller.sucursales);
router.get('/contacto', Controller.contacto);
router.get("/admin/", Controller.admin)
module.exports = router;

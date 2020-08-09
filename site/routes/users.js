var express = require('express');
var router = express.Router();

let Controller = require("../controllers/usersController")

/* pagina usuario. */
router.get('/', Controller.users);

module.exports = router;
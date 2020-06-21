const express   = require('express');
const router    = express.Router();

//controllers
const AdminController   = require('./controllers/AdminController');

router.get('/admins',AdminController.index);

module.exports = router;
const express   = require('express');
const router    = express.Router();

//controllers
const AdminController   = require('./controllers/AdminController');

router.get('/admins',       AdminController.index);
router.get('/admins/:id',   AdminController.show);
router.post('/admins',      AdminController.create);


module.exports = router;
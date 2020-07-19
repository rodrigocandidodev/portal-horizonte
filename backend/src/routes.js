const express   = require('express');
const router    = express.Router();

//controllers
const AdminController   = require('./controllers/AdminController');
const SchoolYearController  = require('./controllers/SchoolYearController');

router.get('/admins',               AdminController.index);
router.get('/admins/:id',           AdminController.show);
router.post('/admins',              AdminController.create);
router.put('/admins/update/:id',    AdminController.update);
router.delete('/admins/delete/:id', AdminController.destroy);

router.get('/school-years',         SchoolYearController.index);
router.post('/school-years',        SchoolYearController.create);

module.exports = router;
const express   = require('express');
const router    = express.Router();

//controllers
const AdminController       = require('./controllers/AdminController');
const SchoolYearController  = require('./controllers/SchoolYearController');
const DepartmentController  = require('./controllers/DepartmentController');

router.get('/admins',               AdminController.index);
router.get('/admins/:id',           AdminController.show);
router.post('/admins',              AdminController.create);
router.put('/admins/update/:id',    AdminController.update);
router.delete('/admins/delete/:id', AdminController.destroy);

router.get('/school-years',                 SchoolYearController.index);
router.get('/school-years/:id',             SchoolYearController.show);
router.post('/school-years',                SchoolYearController.create);
router.delete('/school-years/delete/:id',   SchoolYearController.destroy);

router.post('/departments',                 DepartmentController.create);

module.exports = router;
const express   = require('express');
const router    = express.Router();

//controllers
const AdminController       = require('./controllers/AdminController');
const SchoolYearController  = require('./controllers/SchoolYearController');
const DepartmentController  = require('./controllers/DepartmentController');
const JobController         = require('./controllers/JobController');

router.get('/admins',               AdminController.index);
router.get('/admins/:id',           AdminController.show);
router.post('/admins',              AdminController.create);
router.put('/admins/update/:id',    AdminController.update);
router.delete('/admins/delete/:id', AdminController.destroy);

router.get('/school-years',                 SchoolYearController.index);
router.get('/school-years/:id',             SchoolYearController.show);
router.post('/school-years',                SchoolYearController.create);
router.delete('/school-years/delete/:id',   SchoolYearController.destroy);

router.get('/departments',                  DepartmentController.index);
router.get('/departments/:id',              DepartmentController.show);
router.post('/departments',                 DepartmentController.create);
router.put('/departments/update/:id',       DepartmentController.update);
router.delete('/departments/delete/:id',    DepartmentController.destroy);

router.get('/jobs',                  JobController.index);
router.post('/jobs',                 JobController.create);

module.exports = router;
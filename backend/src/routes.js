const express   = require('express');
const router    = express.Router();

//controllers
const AdminController       = require('./controllers/AdminController');
const SchoolYearController  = require('./controllers/SchoolYearController');
const DepartmentController  = require('./controllers/DepartmentController');
const JobController         = require('./controllers/JobController');
const ColorController       = require('./controllers/ColorController');
const GenderController      = require('./controllers/GenderController');
const SchoolShiftController = require('./controllers/SchoolShiftController');

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
router.get('/jobs/:id',              JobController.show);
router.post('/jobs',                 JobController.create);
router.put('/jobs/update/:id',       JobController.update);
router.delete('/jobs/delete/:id',    JobController.destroy);

router.get('/colors',               ColorController.index);
router.get('/colors/:id',           ColorController.show);
router.post('/colors',              ColorController.create);
router.put('/colors/update/:id',    ColorController.update);
router.delete('/colors/delete/:id', ColorController.destroy);

router.get('/genders',              GenderController.index);
router.get('/genders/:id',          GenderController.show);
router.post('/genders',             GenderController.create);
router.put('/genders/update/:id',   GenderController.update);
router.delete('/genders/delete/:id',GenderController.destroy);

router.get('/school-shifts',              SchoolShiftController.index);
router.get('/school-shifts/:id',          SchoolShiftController.show);
router.post('/school-shifts',             SchoolShiftController.create);

module.exports = router;
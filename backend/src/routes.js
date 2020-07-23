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
const ScholarityController  = require('./controllers/ScholarityController');
const GradeController       = require('./controllers/GradeController');

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
router.put('/school-shifts/update/:id',   SchoolShiftController.update);
router.delete('/school-shifts/delete/:id',SchoolShiftController.destroy);

router.get('/scholarities',                 ScholarityController.index);
router.get('/scholarities/:id',             ScholarityController.show);
router.post('/scholarities',                ScholarityController.create);
router.put('/scholarities/update/:id',      ScholarityController.update);
router.delete('/scholarities/delete/:id',   ScholarityController.destroy);

router.get('/grades',                   GradeController.index);
router.get('/grades/:id',               GradeController.show);
router.post('/grades',                  GradeController.create);
router.put('/grades/update/:id',        GradeController.update);
router.delete('/grades/delete/:id',     GradeController.destroy);

module.exports = router;
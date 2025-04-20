const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Todas las rutas están protegidas

router.post('/createsubject/', authMiddleware, subjectController.createSubject);
router.get('/getallsubjects/', authMiddleware, subjectController.getAllSubjects);
router.get('/getsubjectbyid/:id', authMiddleware, subjectController.getSubjectById);
router.get('/getsubjectsbyname/:nombre', authMiddleware, subjectController.getSubjectsByName);
router.put('/updatesubjectbyid/:id', authMiddleware, subjectController.updateSubjectById);
router.delete('/deletesubjectbyid/:id', authMiddleware, subjectController.deleteSubjectById);
router.post('/:subjectId/add-profesor', authMiddleware, subjectController.addProfesorToSubject);
router.post('/:subjectId/add-estudiante', authMiddleware, subjectController.addEstudianteToSubject);
router.get('/with-users', authMiddleware, subjectController.getSubjectsWithUsers);
router.get('/without-professors', authMiddleware, subjectController.getSubjectsWithoutProfessors);
router.delete('/remove-profesor/:subjectId', authMiddleware, subjectController.removeProfesorFromSubject);
router.delete('/remove-estudiante/:subjectId', authMiddleware, subjectController.removeEstudianteFromSubject);

module.exports = router;

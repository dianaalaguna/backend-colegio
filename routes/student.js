const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Todas las rutas están protegidas

router.post('/createstudent/', authMiddleware, studentController.createStudent);
router.get('/getallstudents/', authMiddleware, studentController.getAllStudents);
router.get('/getstudentbycode/:codigoEstudiante', authMiddleware, studentController.getStudentByCode);
router.get('/getstudentsbyemail/:correoTutor', authMiddleware, studentController.getStudentsByEmail);
router.put('/updatestudentbycode/:codigoEstudiante', authMiddleware, studentController.updateStudentByCode);
router.delete('/deletestudentbycode/:codigoEstudiante', authMiddleware, studentController.deleteStudentByCode);
router.get('/:subjectId/unassigned-students', authMiddleware, studentController.getUnassignedStudentsBySubject);

module.exports = router;

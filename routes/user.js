const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Todas las rutas están protegidas

router.get('/getallusers/', authMiddleware, userController.getAllUsers);
router.get('/getuserbyusername/:username', authMiddleware, userController.getUserByUsername);
router.put('/updateuserbyusername/:username', authMiddleware, userController.updateUserByUsername);
router.delete('/deleteuserbyusername/:username', authMiddleware, userController.deleteUserByUsername);
router.get('/getallprofesores/', authMiddleware, userController.getAllProfesores);

module.exports = router;

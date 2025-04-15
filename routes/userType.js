// backend/routes/userType.js
const express = require('express');
const router = express.Router();
const userTypeController = require('../controllers/userTypeController');

// Ruta para obtener los tipos de usuario
router.get('/', userTypeController.getUserTypes);

module.exports = router;

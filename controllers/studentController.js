// backend/controllers/studentController.js

const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const { codigoEstudiante, nombres, apellidos, correoTutor, nacimiento } = req.body;
    const estado = true;

    const existing = await Student.findOne({ codigoEstudiante });
    if (existing) return res.status(400).json({ message: 'Estudiante ya existe' });

    const student = new Student({ codigoEstudiante, nombres, apellidos, correoTutor, nacimiento, estado });
    await student.save();

    res.status(201).json({ message: 'Estudiante creado' });
  } catch (err) {
    console.error('🔴 Error al registrar estudiante:', err);
    res.status(500).json({ message: 'Error del servidor', error: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener estudiantes' });
  }
};

exports.getStudentByCode = async (req, res) => {
  try {
    const { codigoEstudiante } = req.params;
    const student = await Student.findOne({ codigoEstudiante });
    if (!student) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener estudiante' });
  }
};

exports.getStudentsByEmail = async (req, res) => {
    try {
      const { correoTutor } = req.params;
      const student = await Student.find({ correoTutor });
      if (!student) return res.status(404).json({ message: 'E-Mail no encontrado' });
      res.json(student);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener estudiante' });
    }
  };  

exports.updateStudentByCode = async (req, res) => {
  try {
    const { codigoEstudiante } = req.params;
    const updatedData = req.body;

    const student = await Student.findOneAndUpdate({ codigoEstudiante }, updatedData, {
      new: true
    });

    if (!student) return res.status(404).json({ message: 'Estudiante no encontrado' });

    res.json({ message: 'Estudiante actualizado', student });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar estudiante' });
  }
};

exports.deleteStudentByCode = async (req, res) => {
  try {
    const { codigoEstudiante } = req.params;
    const deletedStudent = await Student.findOneAndDelete({ codigoEstudiante });
    if (!deletedStudent) return res.status(404).json({ message: 'Estudiante no encontrado' });

    res.json({ message: 'Estudiante eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar estudiante' });
  }
};
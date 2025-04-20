// backend/controllers/subjectController.js

const Subject = require('../models/Subject');
const User = require('../models/User');
const Student = require('../models/Student');

// 🔹 Crear materia
exports.createSubject = async (req, res) => {
  try {
    const { nombre, grado, periodo } = req.body;
    const estado = true;

    const existing = await Subject.findOne({ nombre, grado, periodo });
    if (existing) return res.status(400).json({ message: 'Materia ya existente' });

    const subject = new Subject({ nombre, grado, periodo, estado });
    await subject.save();

    res.status(201).json({ message: 'Materia creada' });
  } catch (err) {
    console.error('🔴 Error al registrar materia:', err);
    res.status(500).json({ message: 'Error del servidor', error: err.message });
  }
};

// 🔹 Obtener todas las materias
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener materias' });
  }
};

// 🔹 Obtener materia por ID
exports.getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findOne({ _id: id });
    if (!subject) return res.status(404).json({ message: 'Materia no encontrada' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener materia' });
  }
};

// 🔹 Obtener materias por nombre
exports.getSubjectsByName = async (req, res) => {
  try {
    const { nombre } = req.params;
    const subjects = await Subject.find({ nombre });
    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener materia' });
  }
};

// 🔹 Actualizar materia por ID
exports.updateSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const subject = await Subject.findOneAndUpdate({ _id: id }, updatedData, {
      new: true
    });

    if (!subject) return res.status(404).json({ message: 'Materia no encontrada' });

    res.json({ message: 'Materia actualizada', subject });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar materia' });
  }
};

// 🔹 Eliminar materia por ID
exports.deleteSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubject = await Subject.findOneAndDelete({ _id: id });
    if (!deletedSubject) return res.status(404).json({ message: 'Materia no encontrada' });

    res.json({ message: 'Materia eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar materia' });
  }
};

// 🔸 NUEVO: Asociar profesor a materia
exports.addProfesorToSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { profesorId } = req.body;

    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: 'Materia no encontrada' });

    if (subject.profesores.includes(profesorId)) {
      return res.status(400).json({ message: 'Profesor ya asociado a esta materia' });
    }

    subject.profesores.push(profesorId);
    await subject.save();

    res.json({ message: 'Profesor asociado correctamente', subject });
  } catch (err) {
    res.status(500).json({ message: 'Error al asociar profesor', error: err.message });
  }
};

// 🔸 NUEVO: Vincular estudiante a materia
exports.addEstudianteToSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { estudianteId } = req.body;

    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: 'Materia no encontrada' });

    if (subject.estudiantes.includes(estudianteId)) {
      return res.status(400).json({ message: 'Estudiante ya vinculado a esta materia' });
    }

    subject.estudiantes.push(estudianteId);
    await subject.save();

    res.json({ message: 'Estudiante vinculado correctamente', subject });
  } catch (err) {
    res.status(500).json({ message: 'Error al vincular estudiante', error: err.message });
  }
};

// 🔸 NUEVO: Obtener materias con profesores y estudiantes
exports.getSubjectsWithUsers = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate('profesores', 'nombres apellidos username tipoUsuario')
      .populate('estudiantes', 'nombres apellidos codigoEstudiante');

    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener materias con usuarios', error: err.message });
  }
};

// Eliminar un profesor de la materia
exports.removeProfesorFromSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;   // ID de la materia
    const { profesorId } = req.body;    // ID del profesor a eliminar

    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: 'Materia no encontrada' });

    // Verificamos si el profesor está asociado a la materia
    const index = subject.profesores.indexOf(profesorId);
    if (index === -1) {
      return res.status(400).json({ message: 'Profesor no asociado a esta materia' });
    }

    // Eliminamos al profesor de la lista
    subject.profesores.splice(index, 1);
    await subject.save();

    res.json({ message: 'Profesor desvinculado correctamente', subject });
  } catch (err) {
    res.status(500).json({ message: 'Error al desvincular profesor', error: err.message });
  }
};

// Eliminar un estudiante de la materia
exports.removeEstudianteFromSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;   // ID de la materia
    const { estudianteId } = req.body;    // ID del estudiante a eliminar

    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: 'Materia no encontrada' });

    // Verificamos si el estudiante está asociado a la materia
    const index = subject.estudiantes.indexOf(estudianteId);
    if (index === -1) {
      return res.status(400).json({ message: 'Estudiante no asociado a esta materia' });
    }

    // Eliminamos al estudiante de la lista
    subject.estudiantes.splice(index, 1);
    await subject.save();

    res.json({ message: 'Estudiante desvinculado correctamente', subject });
  } catch (err) {
    res.status(500).json({ message: 'Error al desvincular estudiante', error: err.message });
  }
};

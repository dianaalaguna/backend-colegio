// backend/controllers/subjectController.js

const Subject = require('../models/Subject');

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

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener materias' });
  }
};

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

exports.getSubjectsByName = async (req, res) => {
    try {
      const { nombre } = req.params;
      const subjects = await Subject.find({ nombre });
      if (!subjects) return res.status(404).json({ message: 'Materia no encontrada' });
      res.json(subjects);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener materia' });
    }
};

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
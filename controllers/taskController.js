const Task = require('../models/Task');
const mongoose = require('mongoose');

// GET /api/tasks - obtener todas las tareas del usuario
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

// GET /api/tasks/:id - obtener una tarea por ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'ID inválido' });
  }
};

// POST /api/tasks - crear nueva tarea
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({
      title,
      description,
      user: new mongoose.Types.ObjectId(req.userId),
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear tarea' });
  }
};

// PUT /api/tasks/:id - actualizar tarea
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar tarea' });
  }
};

// DELETE /api/tasks/:id - eliminar tarea
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar tarea' });
  }
};

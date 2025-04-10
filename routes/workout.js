const router = require('express').Router();
const Workout = require('../models/Workout');
const verifyToken = require('../middlewares/verifyToken');

// Crear un nuevo entrenamiento
router.post('/', verifyToken, async (req, res) => {
  try {
    const workout = new Workout({
      userId: req.user._id,
      date: req.body.date,
      activity: req.body.activity,
      duration: req.body.duration,
      notes: req.body.notes
    });

    const savedWorkout = await workout.save();
    res.json(savedWorkout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener entrenamientos del usuario
router.get('/', verifyToken, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar entrenamiento
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ error: 'Entrenamiento no encontrado' });
    res.json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar entrenamiento
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) return res.status(404).json({ error: 'Entrenamiento no encontrado' });
    res.json({ mensaje: 'Entrenamiento eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener entrenamientos por userId
router.get('/:userId', verifyToken, async (req, res) => {
    try {
      const workouts = await Workout.find({ userId: req.params.userId });
      res.json(workouts);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener entrenamientos' });
    }
  });

module.exports = router;

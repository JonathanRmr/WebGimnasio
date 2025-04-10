const router = require('express').Router();
const Workout = require('../models/Workout');
const verifyToken = require('../middlewares/verifyToken');

/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: Operaciones relacionadas con entrenamientos
 */

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Crear un nuevo entrenamiento
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - activity
 *               - duration
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               activity:
 *                 type: string
 *               duration:
 *                 type: number
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entrenamiento creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
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

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Obtener entrenamientos del usuario autenticado
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de entrenamientos
 *       400:
 *         description: Error al obtener los entrenamientos
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/workouts/{id}:
 *   put:
 *     summary: Actualizar un entrenamiento por ID
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del entrenamiento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               activity:
 *                 type: string
 *               duration:
 *                 type: number
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entrenamiento actualizado
 *       400:
 *         description: Error al actualizar
 *       404:
 *         description: Entrenamiento no encontrado
 */
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

/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     summary: Eliminar un entrenamiento por ID
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del entrenamiento a eliminar
 *     responses:
 *       200:
 *         description: Entrenamiento eliminado
 *       400:
 *         description: Error al eliminar
 *       404:
 *         description: Entrenamiento no encontrado
 */
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) return res.status(404).json({ error: 'Entrenamiento no encontrado' });
    res.json({ mensaje: 'Entrenamiento eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/workouts/{userId}:
 *   get:
 *     summary: Obtener entrenamientos por ID de usuario (administrador o analíticas)
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de entrenamientos del usuario
 *       500:
 *         description: Error al obtener entrenamientos
 */
router.get('/:userId', verifyToken, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener entrenamientos' });
  }
});

module.exports = router;

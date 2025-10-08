const express = require('express');
const Game = require('../models/Game');
const { verifyToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/games - list all
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/games/:id
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/games (admin)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title, platform, releaseYear, genre, description } = req.body;
    const game = new Game({ title, platform, releaseYear, genre, description });
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/games/:id (admin)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const update = req.body;
    const game = await Game.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/games/:id (admin)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

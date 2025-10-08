const express = require('express');
const User = require('../models/User');
const Game = require('../models/Game');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/users/:id/favorites
router.get('/:id/favorites', verifyToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const user = await User.findById(req.params.id).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users/:id/favorites - add favorite (body: { gameId })
router.post('/:id/favorites', verifyToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { gameId } = req.body;
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.favorites.includes(gameId)) {
      user.favorites.push(gameId);
      await user.save();
    }
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/users/:id/favorites/:gameId - remove favorite
router.delete('/:id/favorites/:gameId', verifyToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.favorites = user.favorites.filter(f => f.toString() !== req.params.gameId);
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

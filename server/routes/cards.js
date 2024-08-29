const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// Create a new card
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const newCard = new Card({
      id: new mongoose.Types.ObjectId().toString(),
      title,
      description,
    });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// Get all cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cards' });
  }
});

// Get a specific card by title
router.get('/:title', async (req, res) => {
  try {
    const card = await Card.findOne({ title: req.params.title });
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve card' });
  }
});

module.exports = router;

import Card from '../models/cardModel.js';

// GET all cards
export const getCards = async (req, res) => {
  const filter = req.query.cardCollection
    ? { cardCollection: req.query.cardCollection }
    : {};

  const cards = await Card.find(filter);
  res.json(cards);
};

// POST new card
export const createCard = async (req, res) => {
  try {
    const newCard = new Card(req.body);
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update card
export const updateCard = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(updatedCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE card
export const deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
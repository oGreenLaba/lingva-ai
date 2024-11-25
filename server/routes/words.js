const express = require('express');
const Words = require('../models/Word');
const router = express.Router();

// Добавление нового слова
router.post('/', async (req, res) => {
    try {
        const { word, translation, category, userId } = req.body;
        const newWord = new Words({ word, translation, category, userId });
        await newWord.save();
        res.json(newWord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Получение всех слов
router.get('/', async (req, res) => {
    try {
        const words = await Words.find();
        res.json(words);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

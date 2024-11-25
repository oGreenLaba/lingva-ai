const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    word: { type: String, required: true },
    translation: { type: String, required: true },
    category: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Word', WordSchema);

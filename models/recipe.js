const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    comment: { type: String, required: false },
    tags: [{ body: String, date: Date }],
    dateAdded: { type: Date, default: Date.now },
    difficultyLevel: { type: Number, min: 0, max: 3, default: 0 },
});

module.exports = mongoose.model('Recipe', recipeSchema);

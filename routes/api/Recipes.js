const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../../models/recipe');

const router = express.Router();

// @route POST api/countries
// @desc add Recipe
// @access Public
router.post('/', async (req, res) => {
    try {
        const { name, capital, index } = req.body;
        const newRecipe = new Recipe({ name, capital, index });
        await newRecipe.save();
        res.send(newRecipe);
    } catch (e) {
        res.status(404).json({ success: false });
        console.log(e);
    }
});

// @route PUT api/countries/edit/:id
// @desc edit a Recipe
// @access Public
router.put('/edit/:id', async (req, res) => {
    try {
        const { name, capital } = req.body;
        const item = await Recipe.findByIdAndUpdate(req.params.id, {
            name,
            capital,
        });
        res.json({ success: true });
    } catch (e) {
        res.status(404).json({ success: false });
    }
});

// @route PUT api/countries/reorder/
// @desc edit a Recipe's index
// @access Public
router.put('/reorder', async (req, res) => {
    try {
        // console.log(req.body);
        const { mainRecipe, neighborRecipe } = req.body;
        await Recipe.findByIdAndUpdate(mainRecipe._id, mainRecipe);
        await Recipe.findByIdAndUpdate(neighborRecipe._id, neighborRecipe);
        res.json({ success: true });
    } catch (e) {
        res.status(404).json({ success: false });
    }
});

// @route DELETE api/countries/:id
// @desc delete a Recipe
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        const item = await Recipe.findById(req.params.id);
        await item.remove();
        res.json({ success: true });
    } catch (e) {
        res.status(404).json({ success: false });
    }
});

// @route GET api/countries
// @desc get all countries
// @access Public
router.get('/', async (req, res) => {
    const countries = await Recipe.find().sort({ index: 1 });
    res.json(countries);
});

module.exports = router;

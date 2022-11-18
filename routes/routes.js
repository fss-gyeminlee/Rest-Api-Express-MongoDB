const express = require('express');
const Model = require('../models/model');
const Landing = require('../models/landing');
const escapeHtml = require('escape-html')
const router = express.Router();


router.get('/landing/:path', async (req, res) => {
    try {
        const data = await Landing.findOne({"path": req.params.path})
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/landnig/post', async (req, res) => {
    const data = new Landing({
        path: req.body.path,
        html: req.body.html
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.put('/landing/:path', async (req, res) => {
    try {
        const filter = {path: req.params.path};
        const update = {html: req.body.html};
        const result = await Landing.findOneAndUpdate(filter, update, {new: true})
        res.send(result)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new: true};

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;

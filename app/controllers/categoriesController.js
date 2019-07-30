const express = require('express')
const Note = require('../models/note')
const Category = require('../models/category')
const router = express.Router()

router.get('/',(req,res) => {
    Category.find()
    .then((categories) => {
        res.json(categories)
    })
    .catch((err) => {                     
        res.json(err)
    })
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    Promise.all([Category.findById(id),Note.find({category:id})])
        .then(response => {
            res.json({
                category:response[0],
                notes: response[1]
            }) 
        })
        .catch((err) => {
            res.json(err)
        })
})
router.post('/',(req, res) => {
    const body = req.body
    const category = new Category(body)
    category.save()
    .then((category) => {
        res.json(category)
    })
    .catch((err) => {
        res.json(err)
    })
})
router.put('/:id',(req,res) => {
    const id = req.params.id
    const body = req.body
    Category.findByIdAndUpdate(id, { $set: body }, {new: true})
    .then((categories) => {
        res.json(categories)
    })
    .catch((err) => {
        res.json(err)
    })
})
router.delete('/:id',(req,res) => {
    const id = req.params.id
    Category.findByIdAndDelete(id)
    .then((categories) => {
        res.json(categories)
    })
    .catch((err) => {
        res.json(err)
    })
})
module.exports = router

const express = require('express')
const router = express.Router()

const Note = require('../models/note')
const Category = require('../models/category')
const {authenticateUser} = require('../middlewares/authentication')


router.get('/',authenticateUser,(req,res) => {
    const {user} = req
    Category.find({
        user:user._id
    })
    .then((categories) => {
        res.json(categories)
    })
    .catch((err) => {                     
        res.json(err)
    })
})
router.get('/:id',authenticateUser, (req, res) => {
    const id = req.params.id
    Promise.all([Category.findOne({
        user:req.user._id,
        _id: id
    }),Note.find({
        user:req.user._id,
        _id: id,
        category:id
    })])
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
router.post('/',authenticateUser,(req, res) => {
    const {user} = req
    const body = req.body
    const category = new Category(body)
    category.user = user._id
    category.save()
    .then((category) => {
        res.json(category)
    })
    .catch((err) => {
        res.json(err)
    })
})
router.put('/:id',authenticateUser,(req,res) => {
    const id = req.params.id
    const body = req.body
    Category.findOneAndUpdate({
        user: req.user._id,
        _id: id
    }, { $set: body }, {new: true, runValidators: true})
    .then((category) => {
        if(!category){
            res.json({})
        }
        res.json(category)
    })
    .catch((err) => {
        res.json(err)
    })
})
router.delete('/:id',authenticateUser,(req,res) => {
    const id = req.params.id
    Category.findOneAndDelete({
        user: req.user._id,
        _id:id
    })
    .then((categories) => {
        res.json(categories)
    })
    .catch((err) => {
        res.json(err)
    })
})
module.exports = router

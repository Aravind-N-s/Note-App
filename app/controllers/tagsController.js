const express = require('express')
const router = express.Router()
const Tag = require('../models/Tag')
const {authenticateUser} = require('../middlewares/authentication')

router.get('/',authenticateUser, (req, res) =>{
    const {user} = req
    Tag.find({
        user:user._id
    })
        .then(tags => res.json(tags))
        .catch(err=> res.json(err))
})

router.get('/:id',authenticateUser, (req,res) =>{
    const id = req.params.id
    Tag.findOne({
        user:req.user._id,
        _id: id
    }).populate('notes.note', ['title','body'])
        .then(tag => res.json(tag))
        .catch(err=> res.json(err))
})

router.post('/',authenticateUser, (req,res) => {
    const {user} = req
    const body = req.body
    const tag = new Tag(body)
    tag.user = user._id
    tag.save()
        .then(tag => res.json(tag))
        .catch(err=> res.json(err))
})

router.put('/:id',authenticateUser, (req,res) => {
    const id = req.params.id
    const body = req.body
    Tag.findOneAndUpdate({
        user: req.user._id,
        _id: id}, { $set: body }, {new: true})
        .then(tag =>{
            res.json(tag)
        })
        .catch(err=> res.json(err))

})
router.delete('/:id',authenticateUser, (req,res)=> {
    const id = req.params.id
    Tag.findByIdAndDelete(
        {user: req.user._id,
        _id:id}
        )
        .then(tag => res.json(tag))
        .catch(err=> res.json(err))
})
module.exports = router
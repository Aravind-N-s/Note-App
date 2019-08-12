const Note = require('../models/Note')
module.exports.list = (req,res) => {
    const {user} = req
    Note.find({
        user:user._id
    }).populate('category').sort({createdAt: -1})
    .then((notes) => {
        res.json(notes)
    })
    .catch((err) => {
        res.json(err)
    })
}

//post notes
module.exports.create = (req,res) =>{
    const {user} = req
    const body = req.body
    const note = new Note(body)
    note.user = user._id
    note.save()
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })

}

//show one note
module.exports.show = (req,res) => {
    const id = req.params.id
    Note.findOne({
        user:req.user._id,
        _id: id
    }).populate('category').populate('tags.tag', ['name'])
        .then((note) => {
            if(!note){
                res.json({})
            }
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}

//update a note 
module.exports.update =  (req, res) => {
    const id = req.params.id
    const body = req.body
    Note.findOneAndUpdate({
        user: req.user._id,
        _id: id
    }, { $set: body }, {new: true, runValidators: true})
    .then((note) => {
        if(!note){
            res.json({})
        }
        res.json(note)
    })
    .catch((err) => {
        res.json(err)
    })
}

//delete a note
module.exports.destroy = (req, res) => {
    const id = req.params.id
    Note.findOneAndDelete({
        user: req.user._id,
        _id:id})
    .then((note) => {
        res.json(note)
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.removeTag=(req,res)=>{
    const id=req.query.noteId
    const tagId=req.query.tagId
    Note.findById(id)
    .then(note=>{
        note.tags.id(tagId).remove()
        note.save()
        .then(note=>{
            res.json(note)
        })
    })

    Note.findOneAndUpdate({_id:id},{
        $pull:{tags:{_id:tagId}}
    },{new:true})
    .populate('category').populate('tags.tag',['name'])
    .then(note=>{
        res.json(note)
    })
}
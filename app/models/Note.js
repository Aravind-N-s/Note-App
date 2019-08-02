const mongoose = require('mongoose')
const Tag = require('./Tag')

//Schema - Object Constructor Function

const Schema = mongoose.Schema

const NoteSchema = new Schema({
    //field: {config}
    title:{
        type: String,
        required: true
    },
    body:{
        type: String
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    tags:[{
        tag: {
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    }],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

//mongoose middleware
NoteSchema.post('save', function(next){
    const note = this
    note.tags.forEach(function(tagItem){
        Tag.findById(tagItem.tag)
        .then(tag => {
            tag.notes.push({note:note._id})
            tag.save()
            next()                
        })
    })
})

//model based on schema 
const Note = mongoose.model('Note', NoteSchema) //object constructor function

module.exports = Note
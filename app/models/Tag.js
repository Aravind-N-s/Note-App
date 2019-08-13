const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema ({
    name: {
        type: String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notes:[{
        note:{
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    }]
})

const Tag = mongoose.model('Tag', TagSchema)

module.exports = Tag 
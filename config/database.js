//db configuration
const mongoose = require('mongoose')

//connect express to mongo via mongoose
//config the promise lib to be ES6 Promise
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const connection_uri = "mongodb+srv://notes-app_admin:<password>@notesapp-unuia.mongodb.net/test?retryWrites=true&w=majority"
// const connection_uri = 'mongodb://localhost:27017/my-notes'

// const CONNECTION_URI = process.env.MONGODB_URI || 

//connect to db
mongoose.connect(connection_uri, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to the DB')
    })
    .catch((err) => {
        console.log('ERROR connected to DB', err)
    })

module.exports = {
    mongoose
}
//single value sent module.exports = mongoose
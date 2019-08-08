const express = require('express')
const cors = require('cors')
const {mongoose} = require('./config/database') // mongoose without {} if single value is passed
//1st approach
const router = require('./config/routes')
//2nd approach
const { usersRouter } = require('./app/controllers/userController') 
const categoriesRouter = require('./app/controllers/categoriesController')
const tagsRouter = require('./app/controllers/TagsController')

//for heroku 
const path = require("path")
const port = process.env.port || 3001
app.use(express.static(path.join(__dirname + "/client/build/index")))

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})


const app = express()
const port = 3005

app.use(express.json())
app.use(cors())

app.use('/', router) //1st approach
app.use('/categories',categoriesRouter)// 2nd approach
app.use('/tags',tagsRouter)
app.use('/user',usersRouter)


app.listen(port ,() =>{
    console.log('Listening on port', port)
})

const express = require ('express')
const router = express.Router()
const notesController = require('../app/controllers/notesController')
const {authenticateUser} = require('../app/middlewares/authentication')

router.get('/notes',authenticateUser, notesController.list)
router.get('/notes/:id',authenticateUser, notesController.show)
router.post('/notes',authenticateUser, notesController.create)
router.put('/notes/:id',authenticateUser, notesController.update)
router.delete('/notes/removeTag',authenticateUser,notesController.removeTag)
router.delete('/notes/:id',authenticateUser, notesController.destroy)

// router.get('/products', productsController.list)
// router.get('/products/:id', productsController.show)
// router.post('/products', productsController.create)

module.exports = router
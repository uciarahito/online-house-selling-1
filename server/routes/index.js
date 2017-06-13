const express = require('express')
const router = express.Router()
const houseController = require('../controllers/houseController')
const userController = require('../controllers/userController')

// NOTE: user
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/signinfb', userController.signInFB)
router.get('/allusers', userController.getAllUsers)
router.get('/detailuser/:id', userController.getUserById)
router.put('/edituser/:id', userController.editUser)  // password harus disertakan
router.delete('/deleteuser/:id', userController.deleteUserById)

router.get('/allhouse', houseController.getAllHouse)
router.get('/detailhouse/:id', houseController.getDetailHouse)
router.post('/createhouse', houseController.createHouse)
router.put('/editHouse/:id', houseController.editHouse)
router.delete('/deleteHouse/:id', houseController.deleteHouse)

module.exports = router
// we are gonna have three routes
// first is register or create user
// second to log in
// third to get the users information

// bring in express
const express = require('express')
// create our routes
const router = express.Router()
// bring in controller
const {
	registerUser,
	loginUser,
	getMe,
} = require('../controllers/userController')

// when we make a post request to '/api/users'
// when we post is to add a resource
// so we are gonna be adding a user
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)

// export
module.exports = router

// bring in jsonwebtoken
const jwt = require('jsonwebtoken')
// bring in bcrypt
const bcrypt = require('bcryptjs')
// bring in express async handler
const asyncHandler = require('express-async-handler')
// bring in our user model
const User = require('../models/userModel')

// create the registerUser function

// @desc   Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	// when we send our request
	// to this end point /api/users
	// to register user
	// we are gonna have some body data
	// we are gonna destructure that
	const { name, email, password } = req.body

	// validation
	if (!name || !email || !password) {
		// if non of them are included
		// 400 a bad request
		res.status(400)
		throw new Error('Please add all fields')
	}

	// Check if user exits
	// user model,
	// method findOne find the user by the email we pass in
	const userExits = await User.findOne({ email })

	//
	if (userExits) {
		res.status(400)
		throw new Error('User already exits')
	}

	// Hash password
	// generate a salt to hash the password
	// we do that by calling a bcrypt method called genSalt
	// it take the 10 default number of salts
	const salt = await bcrypt.genSalt(10)
	// now that we have the salt
	// we can hash the password
	// method called hash
	// it takes two things
	// one is the plaintext password,
	// that comes from the form,
	// in that case postman
	// and the next is the salt
	// and it gives us the hash password
	const hashedPassword = await bcrypt.hash(password, salt)

	// Create user
	const user = await User.create({
		// fields
		name,
		email,
		password: hashedPassword,
	})

	// user
	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc   Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	res.json({ message: 'Login User' })
})

// @desc   Get user data
// @route   GET /api/users/me
// @access  Public
const getMe = asyncHandler(async (req, res) => {
	res.json({ message: 'User data display' })
})

// export
module.exports = {
	registerUser,
	loginUser,
	getMe,
}

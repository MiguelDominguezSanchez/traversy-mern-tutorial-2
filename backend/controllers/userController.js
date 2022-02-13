// bring in jsonwebtoken
const jwt = require('jsonwebtoken')
// bring in bcrypt
const bcrypt = require('bcryptjs')
// bring in express async handler
const asyncHandler = require('express-async-handler')
// bring in our user model
const User = require('../models/userModel')
const { resourceUsage } = require('process')

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
			// general data
			_id: user.id,
			name: user.name,
			email: user.email,
			// create a token
			token: generateToken(user._id),
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
	// login functionality
	// get the email and password sent  in the body
	const { email, password } = req.body

	// 'User' model findOne method by email
	// Check for user email
	const user = await User.findOne({ email })

	// match the password
	// Check the password
	// we want to compare the passwords
	// the password in the data base is hashed
	// the password we wanna send to the login is not hashed
	// we use a decrypt method called compare to do that
	// it compare the plain text password in the first argument place, sent from the form or postman
	// and secondly you wanna pass in the user that you  just fetched
	// and the password which is hashed
	if (user && (await bcrypt.compare(password, user.password))) {
		// respond json with the same data back in the register
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid credentials')
	}

	res.json({ message: 'Login User' })
})

// @desc   Get user data
// @route   GET /api/users/me
// @access  Public
const getMe = asyncHandler(async (req, res) => {
	res.json({ message: 'User data display' })
})

// Generate JWT
const generateToken = (id) => {
	// method called sign
	// take the payload
	// data we actually put in there
	// its gonna be id that is passed into this function
	// second its gonna be the secret

	return jwt.sign({ id }, process.env.JWT_SECRET, {
		// and the third argument options
		// it expires in 30 days
		expiresIn: '30d',
	})
}

// export
module.exports = {
	registerUser,
	loginUser,
	getMe,
}

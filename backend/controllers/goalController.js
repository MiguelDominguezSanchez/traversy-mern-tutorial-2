// on the controller, when we use mogoose in each of these functions,
// to interact with the data base, we get back a promise,
// so we are gonna be using async await

const asyncHandler = require('express-async-handler')

// bring in the Goal model
// this will have a bunch of mongooose methods on it,
// that we can use to create, in our database
// or read, or whatever is that we wanna do.
const Goal = require('../models/goalModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
	// cerate a variable called goals
	// we can get them form our database
	// through our mongooose model
	// we need to await, this is asynchronous
	// we can take our model 'Goal' and have a method called find
	// and you can pass in an object and find it by something
	// latter on we are gonna find it by the user
	// right now we are gonna get all of them
	const goals = await Goal.find()

	// return the goals
	res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		// check if is not for field sent
		// set status bad request 400
		res.status(400)
		// express error handler
		throw new Error('Please add a text field')
	}
	res.status(200).json({ message: 'Set goals' })
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Update goal ${req.params.id}` })
})

// @desc    Delete goals
// @route   DELETE /api/goals
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete goal ${req.params.id}` })
})

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
}

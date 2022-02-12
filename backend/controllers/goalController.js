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

	// if it text
	// await Goal has a create method
	// and we wanna pass in an object
	const goal = await Goal.create({
		// set a text value
		// which we can from req.body.text
		text: req.body.text,
	})
	// for that json we are gonna set back that goal
	res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
	// get the goal we wanna update
	// await our goal model
	// use findById
	// the way we get the id is req.params.id, thats gonna be the url
	const goal = await Goal.findById(req.params.id)

	// check to make sure that we have it
	if (!goal) {
		// if not goal id provided
		res.status(400)
		// throw error
		throw new Error('Goal not found')
	}

	// we wanna update it
	// create our variable updatedGoal
	// await Goal find by id and update
	// mongo make it all really easy
	// pass in an id, which is rew.params.id
	// second argument is the data, re.body, which be our text
	// last third argument with options,
	// an options object with new set to true
	//  which create if it doesn't exits
	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
	// respond return updatedGoal
	res.status(200).json(updatedGoal)
})

// @desc    Delete goals
// @route   DELETE /api/goals
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id)

	if (!goal) {
		res.status(400)
		throw new Error('Goal not found')
	}

	await goal.remove()

	res.status(200).json({ id: req.params.id })
})

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
}

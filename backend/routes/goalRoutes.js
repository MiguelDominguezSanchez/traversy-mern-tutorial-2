//  Common JS Modules Syntax, different from ES1025
const express = require('express') //  Bring in express to the file
const router = express.Router() // create variable called router and set it to express.Router()
const {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
} = require('../controllers/goalController') // import getGoals function

// Routes setup
// functionality in the body of callback functions
// but is much better practice to create a controller and have your functions there and import them as a function.
// route chain get & post, dont need two lines
router.route('/').get(getGoals).post(setGoal) // get a goal &, create a goal
router.route('/:id').delete(deleteGoal).put(updateGoal) // delete a goal & update a goal

module.exports = router // export it and set it up to router

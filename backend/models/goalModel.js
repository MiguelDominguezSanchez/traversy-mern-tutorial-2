// bring in mongoose require method
const mongoose = require('mongoose')

// create our Schema, set that with mongoose.Schema
const goalSchema = mongoose.Schema(
	{
		// pass an object with our fields
		text: {
			type: String,
			require: [true, 'Please add a text value'],
		},
	},
	// add a second argument here after the schema
	// of an object
	{
		// create and update that field automatically
		timestamps: true,
	}
)

// export mongoose.model, named Goal model, and it's gonna take the goalSchema
module.exports = mongoose.model('Goal', goalSchema)

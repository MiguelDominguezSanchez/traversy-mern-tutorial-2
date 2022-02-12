// bring in mongoose require method
const mongoose = require('mongoose')

// create our Schema, set that with mongoose.Schema
const goalSchema = mongoose.Schema(
	{
		// pass an object with our fields

		// call user
		user: {
			// we want this type to be an object id
			type: mongoose.Schema.Types.ObjectId,
			// required
			required: true,
			// which model is this object id pretend to
			// and that is gonna be a user
			// rer and the name of the model 'User'
			ref: 'User',
		},
		// text
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

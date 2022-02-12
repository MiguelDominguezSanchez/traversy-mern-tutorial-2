// Bring in mongoose, which is a ODM to interact with mongodb
// and we also use to create our schema as in models
const mongoose = require('mongoose')

// create a user schema
// the fields that we want a user to have
// set the variable userSchema to mongoose.Schema
const userSchema = mongoose.Schema(
	{
		// pass an object here and pass our fields
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
		},
	},
	// timestamps field
	{
		timestamps: true,
	}
)

// export mongoose model, the model name is 'user'
// and the schema is 'userSchema'
module.exports = mongoose.model('User', userSchema)

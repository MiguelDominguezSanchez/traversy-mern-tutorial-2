// bring in mongoose
const mongoose = require('mongoose')

// create an arrow asynchronous function called connectDB
// all of our mongoose methods are asynchronous
const connectDB = async () => {
	// return a promise
	// try catch
	try {
		// connect, variable called conn, and await on mongoose
		// and then there is a function called connect,
		// mongoose connect,
		// and that takes in our mongo uri
		// that you can get from process.env.MONGO_URI
		const conn = await mongoose.connect(process.env.MONGO_URI)

		// from connection variable conn, there is an actual object called connection and then host
		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
	} catch {
		console.log(error)
		// close the process
		process.exit(1)
	}
}

// export this
module.exports = connectDB

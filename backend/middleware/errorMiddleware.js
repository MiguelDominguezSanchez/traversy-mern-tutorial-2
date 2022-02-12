// Middleware: Functions that are executed during the request response cycle, so when you make a request.

// function called errorHandler, overwrite the express default error handler, pass err object, and then request response, and then next too call any further middleware.
const errorHandler = (err, req, res, next) => {
	// status code, set, or not set 500 server error
	// create a variable here called statusCode
	// set it to ternary conditional
	const statusCode = res.statusCode ? res.statusCode : 500

	// call res.status and pass in that statusCode
	res.status(statusCode)

	// respond with json
	res.json({
		// on the error object we have a message
		message: err.message,
		// get the stack tace, some additional information
		// I only want that if we are in development mode
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	})
}

module.exports = {
	// export an object with erroHandler
	errorHandler,
	// you can add other types of erro handlers
}

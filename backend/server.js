const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
// bring in the error handler, from middleware
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json()) // middleware use, express body parse for raw json
app.use(express.urlencoded({ extended: false })) // for url encoded, passed an object with an extended value of false

app.use('/api/goals', require('./routes/goalRoutes'))

// error handler overwrite the default express error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

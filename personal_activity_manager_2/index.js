const status = require('http-status');
const express = require('express')
const app = express()
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')
const cors = require("cors")
const helmet = require("helmet")

const category = require('./src/routes/category')
const activity = require('./src/routes/activity')
const user = require('./src/routes/user')

app.use(cors());
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/category', category)
app.use('/activity', activity)
app.use('/user', user)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.listen(3000, () => {
    console.log("Server started!");
})


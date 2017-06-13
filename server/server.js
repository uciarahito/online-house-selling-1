const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const index = require('./routes/index')
require('dotenv').config()
app.use(cors())

mongoose.connect('mongodb://localhost/online-house-selling-map')

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/', index)

app.listen(app.get('port'), () => {
  console.log('Listen on port: '+app.get('port'));
})
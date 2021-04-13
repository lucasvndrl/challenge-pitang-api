const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const Routes = require('./routes/index')

require('dotenv').config()

const { MONGO_URL, HTTP_PORT } = process.env

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

app.use(express.json())
app.use(cors())
app.use(Routes)

app.listen(HTTP_PORT, () => console.log(`Rodando na porta ${HTTP_PORT}`))

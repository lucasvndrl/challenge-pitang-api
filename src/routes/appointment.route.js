const express = require('express')
const AppointmentController = require('../controllers/appointment.controller')
const Routes = express.Router()

Routes.get('/appointment/:id')
Routes.put('/appointment/:id')
Routes.get('/appointment', AppointmentController.index)
Routes.post('/appointment', AppointmentController.store)
Routes.post('/auth')

module.exports = Routes

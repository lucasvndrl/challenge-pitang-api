const { request } = require('express')
const AppointmentModel = require('../models/appointment.model')
const Yup = require('yup')

class Appointment {
  async index(req, res) {
    try {
      const appointments = await AppointmentModel.find()

      res.send({ appointments })
    } catch (e) {
      res.status(400).json({ message: 'ERRO' })
    }
  }

  async store(req, res) {
    const body = {
      ...req.body,
      birthday: new Date(req.body.birthday),
      selectedDate: new Date(req.body.selectedDate),
    }

    const schema = Yup.object().shape({
      name: Yup.string().required('Name field required'),
      birthday: Yup.date().required('Birthday field required'),
      selectedDate: Yup.date().required('Selected date required'),
    })

    try {
      await schema.validate(body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error })
    }

    body.attended = false

    try {
      const appointment = await AppointmentModel.create(body)

      res.send({ appointment })
    } catch (e) {
      res.status(400).json({ message: 'ERROR' })
    }
  }

  async update(req, res) {
    const {
      body,
      params: { id },
    } = req

    const appointment = await AppointmentModel.findByIdAndUpdate(id, body, {
      new: true,
    })

    res.send({ appointment })
  }

  async remove(req, res) {
    const { id } = req.params

    try {
      const appointment = await AppointmentModel.findById(id)

      if (!appointment) {
        return res.send({ message: 'Appointment does not exist.' })
      }

      await appointment.remove()

      res.send({ message: 'Appointment Removed' })
    } catch (e) {
      res.status(400).send({ message: 'ERROR' })
    }
  }
}

module.exports = new Appointment()

const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist'
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  },
  note: {
    type: String,
  },
  accept: {
    type: Boolean
  },
  total: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Pending", "Upcoming", "Decline", "Done"],
    default: "Pending"
  }
})

module.exports =  mongoose.model("Appointment", appointmentSchema);
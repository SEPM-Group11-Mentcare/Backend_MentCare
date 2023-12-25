const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
  dateTime: {
    type: Date,
    required: [true, "Date is required"]
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist'
  },
  status: {
    type: String,
    enum: ["Free", "Booked"],
    default: "Free"
  }
})

module.exports =  mongoose.model("Schedule", scheduleSchema);
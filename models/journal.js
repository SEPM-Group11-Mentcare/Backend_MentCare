const mongoose = require("mongoose");
const { format } = require("date-fns");

const journalSchema = new mongoose.Schema({
  journalTitle: { type: String, required: true },
  journalText: { type: String },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  mood: { type: String, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;

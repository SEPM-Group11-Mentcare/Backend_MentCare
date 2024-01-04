const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  journalText: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  mood: { type: String },
  userId: { type: String, required: true }, // Added userId field
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;

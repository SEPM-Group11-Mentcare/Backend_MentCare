const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  journalTitle: { type: String, required: true },
  journalText: { type: String, required: true },
  createdDate: {
    type: Date,
    default: () => format(new Date(), "dd/MM/yy"),
  },
  mood: { type: String, required: true },
  userId: { type: String, required: true },
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;

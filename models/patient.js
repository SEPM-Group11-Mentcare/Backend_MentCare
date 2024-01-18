const mongoose = require("mongoose");
const Account = require("./account");

const patientSchema = new mongoose.Schema({
  listOfAccess: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist'
  }],
});

patientSchema.add(Account.accountSchema);

module.exports = mongoose.model("Patient", patientSchema);

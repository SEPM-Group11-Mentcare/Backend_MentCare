const mongoose = require('mongoose')
const Account = require('./account')

const patientSchema = new mongoose.Schema({

})

patientSchema.add(Account.accountSchema);

module.exports = mongoose.model('Patient', patientSchema)
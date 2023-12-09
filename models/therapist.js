const mongoose = require('mongoose');
const Account = require('./account');

const therapistSchema = new mongoose.Schema({
  nationalID: {
    type: String,
    required: [true, 'National ID is required'],
    unique: true
  },
  specialization: {
    type: String,
    required: [true]
  },
  pratisingCertNum: {
    type: String,
    required: [true, 'Pratising Cert Num is required'],
    unique: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approve', 'Decline'],
    default: 'Pending'
  }
})

therapistSchema.add(Account.accountSchema);

module.exports = mongoose.model('Therapist', therapistSchema)
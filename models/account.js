const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String, 
    enum: ['user', 'therapist', 'admin']
  }
})

const Account = mongoose.model("Account", accountSchema);

module.exports = {Account, accountSchema}
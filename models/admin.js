const mongoose = require('mongoose');
const Account = require('./account');

const adminSchema = new mongoose.Schema({

})

adminSchema.add(Account.accountSchema);

module.exports = mongoose.model('Admin', adminSchema)

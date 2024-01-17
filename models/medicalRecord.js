const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    meetingSummary: {
        type: String,
        required: [true, 'Meeting summary is required']
    },
    diagnostic: {
        type: String,
        required: [true, 'Diagnostic is required']
    },
    prescription: {
        type: String
    },
    advice: {
        type: String
    },
    issuedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
const MedicalRecord = require('../models/medicalRecord');
const Appointment = require('../models/appointment');
const Patient = require('../models/patient');
const Therapist = require('../models/therapist');
const ErrorHandler = require('../middlewares/error');

// Create a medical record
module.exports.create = async (req, res, next) => {
    try {
        const data = {
            meetingSummary: req?.body?.meetingSummary,
            diagnostic: req?.body?.diagnostic,
            issuedAt: req?.body?.issuedAt,
            appointment: req?.body?.appointment,
            prescription: req?.body?.prescription,
            advice: req?.body?.advice
        }
        const newRecord = await MedicalRecord.create(data);
        console.log(newRecord);
        res.status(200).json('New record created successfully');
    }
    catch (err) {
        next(new ErrorHandler(err.message, 500));
    }


}

// View all medical records
module.exports.viewRecords = async (req, res, next) => {
    const user = req.userID;
    try {
        // Find the user account type
        const patient = await Patient.findById(user);
        const therapist = await Therapist.findById(user);
        // Find the appointment related to the user (patient or doctor)
        let appointments;
        if (patient) {
            appointments = await Appointment.find({ patient: patient });
        }
        else if (therapist) {
            appointments = await Appointment.find({ therapist: therapist });
        }

        const records = appointments.map(async (appointment) => {
            await MedicalRecord.findOne({ appointment: appointment });
        });

        if (records.length == 0) {
            return new ErrorHandler('No medical records found', 404);
        }

        res.status(200).json(records);
    }
    catch (err) {
        next(new ErrorHandler(err.message, 500))
    }
}

// View a medical record's details
module.exports.viewRecord = async (req, res, next) => {
    const recordId = req.params.id;
    try {
        const medicalRecord = await MedicalRecord.findById(recordId);
        if (!medicalRecord) {
            return new ErrorHandler('Medical record not found', 404);
        }
        res.status(200).json(medicalRecord);
    }
    catch (err) {
        next(new ErrorHandler(err.message, 500))
    }
}

// Update a medical record's information
module.exports.update = async (req, res, next) => {
    const recordId = req.params.id;

    // Retrieve fields of the saving goal from the form data
    const dataToUpdate = {
        meetingSummary: req?.body?.meetingSummary,
        diagnostic: req?.body?.diagnostic,
        issuedAt: req?.body?.issuedAt,
        appointment: req?.body?.appointment,
        prescription: req?.body?.prescription,
        advice: req?.body?.advice
    };

    try {
        // Check if the record with the given ID exists
        const existingRecord = await MedicalRecord.findById(recordId);
        if (!existingRecord) {
            return next(new ErrorHandler("Medical record not found", 404));
        }
        // Update the record with the new data
        const updatedRecord = await MedicalRecord.findByIdAndUpdate(
            recordId,
            dataToUpdate,
            { new: true }
        );
        res.status(200).json("Medical record updated successfully");
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
};

// Delete a medical record
exports.delete = async (req, res, next) => {
    const recordId = req.params.id;
    try {
        // Delete the record
        const record = await MedicalRecord.findByIdAndDelete(recordId);
        res.status(200).json("Medical record successfully deleted");
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
};
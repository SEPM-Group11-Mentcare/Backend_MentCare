const MedicalRecord = require("../models/medicalRecord");
const Appointment = require("../models/appointment");
const Patient = require("../models/patient");
const Therapist = require("../models/therapist");
const ErrorHandler = require("../middlewares/error");
const Schedule = require("../models/schedule");

// Create a medical record
module.exports.create = async (req, res, next) => {
  try {
    const data = {
      meetingSummary: req?.body?.meetingSummary,
      diagnostic: req?.body?.diagnostic,
      issuedAt: req?.body?.issuedAt,
      appointment: req?.body?.appointment,
      prescription: req?.body?.prescription,
      advice: req?.body?.advice,
    };
    const newRecord = await MedicalRecord.create(data);
    console.log(newRecord);
    res.status(200).json("New record created successfully");
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

// View all medical records
module.exports.viewRecords = async (req, res, next) => {
  // const user = req.userID;
  // const user = await Pa
  const user = req.params.id;
  try {
    // Find the user account type
    const patient = await Patient.findById(user);
    const therapist = await Therapist.findById(user);
    // Find the appointment related to the user (patient or doctor)
    let appointments;
    if (patient) {
      appointments = await Appointment.find({ patient: patient });
    } else if (therapist) {
      appointments = await Appointment.find({ therapist: therapist });
    }

    const records = await Promise.all(
      appointments.map(async (appointment) => {
        const medicalRecord = await MedicalRecord.findOne({
          appointment: appointment,
        });
        if (medicalRecord) {
          const appointmentInfo = await Appointment.findById(appointment._id);
          const therapist = await Therapist.findById(appointmentInfo.therapist);
          const patient = await Patient.findById(appointmentInfo.patient);
          return {
            _id: medicalRecord._id,
            date: medicalRecord.issuedAt,
            diagnostic: medicalRecord.diagnostic,
            meetingSummary: medicalRecord.meetingSummary,
            prescription: medicalRecord.prescription,
            advice: medicalRecord.advice,
            therapist: therapist.name,
            patient: patient.name,
            patientID: patient._id,
            therapistID: therapist._id,
          };
        }
      })
    );

    if (records.length == 0) {
      return new ErrorHandler("No medical records found", 404);
    }
    // Filter out undefined values
    const definedRecords = records.filter((record) => record !== undefined);

    // console.log(records);
    res.status(200).json(definedRecords);
  } catch (err) {
    // next(new ErrorHandler(err.message, 500));
  }
};

// View a medical record's details
module.exports.viewRecord = async (req, res, next) => {
  const recordId = req.params.id;
  try {
    //   console.log(recordId);
    const medicalRecord = await MedicalRecord.findById(recordId);
    if (!medicalRecord) {
      return new ErrorHandler("Medical record not found", 404);
    }
    // console.log(medicalRecord);

    const appointment = await Appointment.findById(
        medicalRecord.appointment
      ).catch((err) => {
        next(new ErrorHandler(err.message, 404));
      });

    const therapist = await Therapist.findById(appointment.therapist).catch(
      (err) => {
        next(new ErrorHandler(err.message, 404));
      }
    );

    const patient = await Patient.findById(appointment.patient).catch(
      (err) => {
        next(new ErrorHandler(err.message, 404));
      }
    );

    const schedule = await Schedule.findById(appointment.schedule).catch(
      (err) => {
        next(new ErrorHandler(err.message, 404));
      }
    );

    // console.log(therapist);

    const medicalRecordInfo = {
      _id: medicalRecord._id,
      date: medicalRecord.issuedAt,
      diagnostic: medicalRecord.diagnostic,
      meetingSummary: medicalRecord.meetingSummary,
      prescription: medicalRecord.prescription,
      advice: medicalRecord.advice,
      therapist: therapist.name,
      patient: patient.name,
      patientID: patient._id,
      therapistID: therapist._id,
      dateTime: schedule.dateTime,
      appointmentID: appointment._id
    };

    // console.log("1234");

    // console.log(medicalRecordInfo);

    res.status(200).json(medicalRecordInfo);
  } catch (err) {
    // next(new ErrorHandler(err.message, 500));
  }
};

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
    advice: req?.body?.advice,
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

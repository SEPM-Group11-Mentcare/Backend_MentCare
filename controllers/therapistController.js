const Admin = require("../models/admin");
const Therapist = require("../models/therapist");
const ErrorHandler = require("../utils/errorHandler");
const Patient = require("../models/patient");
const Schedule = require("../models/schedule");
const Appointment = require("../models/appointment");
const MedicalRecord = require("../models/medicalRecord");

exports.setSchedule = async (req, res, next) => {
  const data = {
    schedules: req.body.schedule,
    user: req.userID,
  };

  data.schedules.map(async (date) => {
    await Schedule.create({ dateTime: date, therapist: data.user }).catch(
      (err) => {
        next(new ErrorHandler(err.message, 404));
      }
    );
  });

  res.status(200).json("Create successfully");
};

exports.getSchedule = async (req, res, next) => {
  const schedules = await Schedule.find({
    therapist: req.userID,
  }).catch((err) => {
    next(new ErrorHandler(err.message, 404));
  });

  res.status(200).json(schedules);
};

exports.deleteSchedule = async (req, res, next) => {
  await Schedule.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json("Delete successfully");
    })
    .catch((err) => {
      next(new ErrorHandler(err.message, 404));
    });
};

// Therapist - Update profile
exports.updateProfile = async (req, res, next) => {
  try {
    const id = req.userID;
    console.log(req.userID);
    const data = {
      name: req?.body?.name,
      username: req?.body?.username,
      nationalID: req?.body?.nationalID,
      specialization: req?.body?.specialization,
      practisingCertNum: req?.body?.practisingCertNum,
    };
    const updatedProfile = await Therapist.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedProfile) {
      return next(new ErrorHandler("Profile not found", 404));
    }
    res.status(200).json("Update profile successfully");
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

module.exports.getRequestList = async (req, res, next) => {
  const filter = {
    status: "Confirmed" || "Declined",
    therapist: req.userID,
  };
  const appointments = await Appointment.find(filter).catch((err) => {
    next(new ErrorHandler(err.message, 404));
  });

  const appointmentInfo = await Promise.all(
    appointments.map(async (appointment) => {
      const patient = await Patient.findById(appointment.patient).catch(
        (err) => {
          next(new ErrorHandler(err.message, 404));
        }
      );

      const record = await MedicalRecord.findOne({appointment: appointment._id})
      .catch((err) => {
        next(new ErrorHandler(err.message, 404));
      })

      const therapist = await Therapist.findById(appointment.therapist).catch(
        (err) => {
          next(new ErrorHandler(err.message, 404));
        }
      );

      const schedule = await Schedule.findById(appointment.schedule).catch(
        (err) => {
          next(new ErrorHandler(err.message, 404));
        }
      );

      return {
        patientName: patient.name,
        patient: patient._id,
        therapistName: therapist.name,
        therapist: therapist._id,
        dateTime: schedule.dateTime,
        id: appointment._id,
        accept: appointment.accept,
        note: appointment.note,
        total: appointment.total,
        status: appointment.status,
        record: record ? record._id : null,
        meetingID: appointment.meetingID,
      };
    })
  );

  // console.log(appointmentInfo);
  res.status(200).json(appointmentInfo);
};

exports.getPatientList = async (req, res, next) => {
  try {
    const user = req.userID;
    // const user = "656985db94e13306d13304d3";
    const patients = await Patient.find().catch((err) => {
      next(new ErrorHandler(err.message, 404));
    });

    // console.log(req.userID);

    const patientList = [];
    await Promise.all(
      patients.map(async (patient) => {
        const listOfAccess = patient.listOfAccess;
        if (listOfAccess) {
          // console.log(patient.listOfAccess);
          listOfAccess.map((access) => {
            if (JSON.stringify(access) === JSON.stringify(user._id)) {
              const patientInfo = {
                _id: patient._id,
                name: patient.name,
              };
              patientList.push(patientInfo);
            }
          });
        }
      })
    );

    // console.log(patientList);
    res.status(200).json(patientList);
  } catch (err) {
    next(new ErrorHandler(err.message, 404));
  }
};

// exports.updateProfile = async (req, res, next) => {
//   const data = {
//     id: req?.body?.id,
//     username: req?.body?.username,
//     name: req?.body?.name,
//     dob: req?.body?.dob,
//     nationalID: req?.body?.nationalID,
//     practisingCertNum: req?.body?.practisingCertNum,
//     specialization: req?.body?.specialization,
//     price: req?.body?.price,
//     aboutme: req?.body?.aboutme,
//     experience: req?.body?.experience,
//   };

//   try {
//     // console.log(data);
//     await Therapist.findByIdAndUpdate(
//       req.userID,
//       {
//         id: data.id,
//         username: data.username,
//         name: data.name,
//         dob: data.dob,
//         nationalID: data.nationalID,
//         practisingCertNum: data.practisingCertNum,
//         specialization: data.specialization,
//         price: data.price,
//         aboutme: data.aboutme,
//         experience: data.experience,
//       },
//       {
//         new: true,
//       }
//     );
//   } catch (err) {
//     next(new ErrorHandler(err.message, 404));
//   }
// };

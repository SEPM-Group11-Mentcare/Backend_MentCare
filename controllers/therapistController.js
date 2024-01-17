const Admin = require("../models/admin");
const Therapist = require("../models/therapist");
const ErrorHandler = require("../utils/errorHandler");
const Patient = require("../models/patient");
const Schedule = require("../models/schedule");
const Appointment = require("../models/appointment");

exports.setSchedule = async (req, res, next) => {
  const data = {
    schedules: req.body.schedule,
    user: "656985db94e13306d13304d3",
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
    therapist: "656985db94e13306d13304d3",
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
module.exports.updateProfile = async (req, res, next) => {
    try {
        const id = req.userID;
        const data = {
            name: req?.body?.name,
            username: req?.body?.username,
            nationalID: req?.body?.nationalID,
            specialization: req?.body?.specialization,
            practisingCertNum: req?.body?.practisingCertNum,
        }
        const updatedProfile = await Therapist.findByIdAndUpdate(id, data, { new: true });
        if (!updatedProfile) {
            return next(new ErrorHandler('Profile not found', 404));
        }
        res.status(200).json(updatedProfile);
    }
    catch (err) {
        next(new ErrorHandler(err.message, 500));
    }


}

module.exports.getRequestList = async(req, res, next) => {
  const filter = {
    status: "Confirmed" || "Declined",
    therapist: "656985db94e13306d13304d3",
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
      };
    })
  );

  // console.log(appointmentInfo);
  res.status(200).json(appointmentInfo);
}


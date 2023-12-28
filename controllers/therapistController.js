const Admin = require("../models/admin");
const Therapist = require("../models/therapist");
const ErrorHandler = require("../utils/errorHandler");
const Patient = require("../models/patient");
const Schedule = require("../models/schedule");
const therapist = require("../models/therapist");

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


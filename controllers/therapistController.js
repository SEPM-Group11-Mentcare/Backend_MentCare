
const Admin = require("../models/admin");
const Therapist = require("../models/therapist");
const ErrorHandler = require("../utils/errorHandler");
const Patient = require("../models/patient");
const Schedule = require("../models/schedule");

exports.setSchedule = async (req, res, next) => {
  const data = {
    schedules: req.body.schedule,
    user: "656985db94e13306d13304d3"
  }

  // const list = data.map((date) => {
  //   const day = new Date(date).toLocaleDateString("en-GB", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     hour12: false,
  //   });
  //   return day;
  // });

  data.schedules.map(async(date) => {
    await Schedule.create({dateTime: date, therapist: data.user})
    .catch((err) => {
      next(new ErrorHandler(err.message, 404));
    })
  })

  res.status(200).json("Create successfully")
};

exports.getSchedule = async(req, res, next) => {
  const schedules = await Schedule.find({therapist: "656985db94e13306d13304d3"})
  .catch((err) => {
    next(new ErrorHandler(err.message, 404));
  })

  res.status(200).json(schedules);
}

exports.deleteSchedule = async(req, res, next) => {
  await Schedule.findByIdAndDelete(req.params.id)
  .then(() => {
    res.status(200).json("Delete successfully");
  })
  .catch((err) => {
    next(new ErrorHandler(err.message, 404));
  })

}

// Get all therapists with pagination
exports.getTherapists = async (req, res, next) => {
    try {
        // Get page number and number of items per page
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = parseInt(req.query.size) || 10;
        // Calculate skip values
        const skip = (page-1) * itemsPerPage;

        const therapists = await Therapist.find().skip(skip).limit(itemsPerPage);
        const total = (await Therapist.find()).length

        // Response
        res.status(200).json({therapists: therapists, total: total});
    }

    catch (err) {
        console.error(err);
    }
}

// Get a therapist
exports.getTherapist = async (req, res, next) => {
    const id = req.params.id;
    try {
        const therapist = await Therapist.findById({ _id: id })
        .catch((err) => {
          next(new ErrorHandler(err.message, 404))
        })
        // Response
        res.status(200).json(therapist);
    }
    catch (err) {
        console.error(err);
        next(new ErrorHandler(err.message, 404));
    }
  }

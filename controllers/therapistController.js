const Admin = require("../models/admin");
const Therapist = require("../models/therapist");
const ErrorHandler = require("../utils/errorHandler");
const Patient = require("../models/patient");

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

  data.schedules.map((date) => {
    await 
  })
};

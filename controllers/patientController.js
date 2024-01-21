const Admin = require("../models/admin");
const Therapist = require("../models/therapist");
const ErrorHandler = require("../utils/errorHandler");
const Patient = require("../models/patient");
const Schedule = require("../models/schedule");
const Appointment = require("../models/appointment");

exports.bookAppointment = async (req, res, next) => {
  const data = {
    patient: req.userID,
    therapist: req?.body?.therapist,
    schedule: req?.body?.schedule,
    note: req?.body?.note,
    accept: req?.body?.accept,
    total: req?.body?.total,
    meetingID: req?.body?.meetingID,
  };

  console.log(data);

  try {
    const appointment = await Appointment.create(data).catch((err) => {
      next(new ErrorHandler(err.message, 404));
    });

    await Schedule.findByIdAndUpdate(
      data.schedule,
      { status: "Booked" },
      { new: true }
    ).catch((err) => {
      next(new ErrorHandler(err.message, 404));
    });

    res
      .status(200)
      .json({ message: "Booking successfully", appointment: appointment });
  } catch (err) {
    next(new ErrorHandler(err.message, 404));
  }
};

// Get all therapists with pagination
exports.getTherapists = async (req, res, next) => {
  try {
    const today = new Date().setHours(0, 0, 0, 0);
    // Get page number and number of items per page
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.size) || 10;
    // Calculate skip values
    const skip = (page - 1) * itemsPerPage;

    const therapists = await Therapist.find().skip(skip).limit(itemsPerPage);
    const therapistList = await Promise.all(
      therapists.map(async (therapist) => {
        const schedules = await Schedule.find({
          therapist: therapist._id,
          dateTime: {
            $gte: today,
            $lt: new Date(today).getTime() + 24 * 60 * 60 * 1000,
          },
        });

        // Check if all schedules are booked
        let check = schedules.every((schedule) => schedule.status === "Booked");

        let availableToday;
        if (check || !schedules) {
          availableToday = false;
        } else {
          availableToday = true;
        }

        return {
          _id: therapist._id,
          specialization: therapist.specialization,
          name: therapist.name,
          availableToday: availableToday,
          price: therapist.price,
        };
      })
    );
    const total = (await Therapist.find()).length;
    // Response
    res.status(200).json({ therapists: therapistList, total: total });
  } catch (err) {
    console.error(err);
    next(new ErrorHandler(err.message, 500));
  }
};

// Get a therapist
exports.getTherapist = async (req, res, next) => {
  const id = req.params.id;
  try {
    const therapist = await Therapist.findById({ _id: id }).catch((err) => {
      next(new ErrorHandler(err.message, 404));
    });
    // Response
    res.status(200).json(therapist);
  } catch (err) {
    console.error(err);
    next(new ErrorHandler(err.message, 404));
  }
};

exports.getTherapistSchedule = async (req, res, next) => {
  const schedules = await Schedule.find({
    therapist: req.params.id,
  }).catch((err) => {
    next(new ErrorHandler(err.message, 404));
  });

  res.status(200).json(schedules);
};

exports.getScheduleTime = async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id).catch((err) => {
    next(new ErrorHandler(err.message, 404));
  });

  res.status(200).json(schedule);
};

/* Patient - Update profile */
exports.updateProfile = async (req, res, next) => {
  try {
    const data = {
      // id:req?.body?.id,
      name: req?.body?.name,
      username: req?.body?.username,
      dob: req?.body?.dob,
    };
    const updatedProfile = await Patient.findByIdAndUpdate(req.userID, data, {
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

exports.getAppointment = async (req, res, next) => {
  const filter = {
    status: req?.query?.status,
    patient: req.userID,
  };
  if (filter.status === "All") {
    delete filter.status;
  }

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
        meetingID: appointment.meetingID,
      };
    })
  );
  res.status(200).json(appointmentInfo);
};

exports.changeAppointmentStatus = async (req, res, next) => {
  const { appointmentID } = req?.body;
  try {
    const updateAppointment = await Appointment.findByIdAndUpdate(
      appointmentID,
      { $set: { status: "Declined" } },
      { new: true, runValidators: true }
    ).catch((err) => {
      next(new ErrorHandler(err.message, 404));
    });

    await Schedule.findByIdAndUpdate(
      updateAppointment.schedule,
      { status: "Free" },
      { new: true }
    ).catch((err) => {
      next(new ErrorHandler(err.message, 404));
    });

    if (!updateAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment status updated",
      appointment: updateAppointment,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 404));
  }
};

exports.getAccessList = async (req, res, next) => {
  const accessList = req.userID.listOfAccess;
  try {
    const therapistList = await Promise.all(
      accessList.map(async (access) => {
        const therapist = await Therapist.findById(access);
        return therapist;
      })
    );

    // console.log(therapistList);
    res.status(200).json(therapistList);
  } catch (err) {
    next(new ErrorHandler(err.message, 404));
  }
};

exports.removeAccess = async (req, res, next) => {
  const accessList = req.userID.listOfAccess;
  const newAccessList = accessList.filter(
    (access) => JSON.stringify(access) != JSON.stringify(req.params.id)
  );
  await Patient.findByIdAndUpdate(
    req.userID,
    {
      listOfAccess: newAccessList,
    },
    { new: true }
  ).catch((err) => {
    next(new ErrorHandler(err.message, 404));
  });
  res.status(200).json("Remove access successfully");
};

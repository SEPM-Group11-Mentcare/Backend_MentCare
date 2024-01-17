const Appointment = require("../models/appointment");
const Patient = require("../models/patient");
const Schedule = require("../models/schedule");
const Therapist = require("../models/therapist");
const ErrorHandler = require("../utils/errorHandler");

exports.changeTherapistStatus = async (req, res, next) => {
  const { therapistID, newStatus } = req?.body;

  try {
    const updatedTherapist = await Therapist.findByIdAndUpdate(
      therapistID,
      { $set: { status: newStatus } },
      { new: true, runValidators: true }
    );

    if (!updatedTherapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    res.status(200).json({
      message: "Therapist status updated",
      therapist: updatedTherapist,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 404));
  }
};

exports.getTherapistRequestList = async (req, res, next) => {
  try {
    const filter = {
      status: req?.query?.status,
    };
    if (filter.status === "All") {
      delete filter.status;
    }
    const pendingTherapists = await Therapist.find(filter).catch(() => {
      next(new ErrorHandler("Not found therapist requests", 404));
    });
    res.status(200).json(pendingTherapists);
  } catch (error) {
    next(error);
  }
};

exports.getAppointments = async (req, res, next) => {
  const filter = {
    status: req?.query?.status,
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
      };
    })
  );

  // console.log(appointmentInfo);
  res.status(200).json(appointmentInfo);
};

exports.changeAppointmentStatus = async (req, res, next) => {
  const { appointmentID, newStatus } = req?.body;

  try {
    const updateAppointment = await Appointment.findByIdAndUpdate(
      appointmentID,
      { $set: { status: newStatus } },
      { new: true, runValidators: true }
    ).catch((err) => {
      next(new ErrorHandler(err.message, 404));
    });

    if (updateAppointment.accept === true) {
      const patient = Patient.findById(updateAppointment.patient).catch(
        (err) => {
          next(new ErrorHandler(err.message, 404));
        }
      );
      const therapistToUpdate = updateAppointment.therapist;

      // Check if therapistToUpdate is not already in the listOfAccess array
      const isTherapistAlreadyAdded =
        patient.listOfAccess.includes(updateAppointment.therapist);
      if (!isTherapistAlreadyAdded) {
        await Patient.findByIdAndUpdate(
          updateAppointment.patient,
          { $addToSet: { listOfAccess: therapistToUpdate } },
          { new: true } // This option returns the modified document
        ).catch((err) => {
          next(new ErrorHandler(err.message, 404));
        });
      }

      // .catch((err) => {
      //   next(new ErrorHandler(err.message, 404));
      // });
    }

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

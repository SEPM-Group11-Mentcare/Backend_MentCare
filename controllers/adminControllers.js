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
      status: req?.query?.status
    }
    if (filter.status === "All") {
      delete filter.status;
    }
    const pendingTherapists = await Therapist.find(filter)
    .catch(() => {
      next(new ErrorHandler("Not found therapist requests", 404))
    })
    res.status(200).json(pendingTherapists);
  } catch (error) {
    next(error); 
  }
};

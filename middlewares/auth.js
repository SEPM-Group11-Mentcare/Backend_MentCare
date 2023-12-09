const Admin = require("../models/admin");
const Patient = require("../models/patient");
const Therapist = require("../models/therapist");
const jwt = require("jsonwebtoken");
// const ErrorResponse = require("../utils/errorResponse");

// Exports a check authenticated function
exports.isAuthenticated = async (req, res, next) => {
  // console.log(req.headers.authorization)
  // return res.status(401).json({message: "You must login", data: ""});

  try {
    const token = req.headers.authorization;
    // console.log(token);
    // If the token is not existed render to login page with message
    if (!token) {
      return res.status(401).json({ message: "You must login", data: token });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Decode the token to get the customer id
    const patient = await Patient.findById(decode.id);
    const therapist = await Therapist.findById(decode.id);
    const admin = await Admin.findById(decode.id);

    if (patient) {
      req.userID = patient;
    }

    if (therapist) {
      req.userID = therapist;
    }

    if (admin) {
      req.userID = admin;
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "You must login" });
  }
};

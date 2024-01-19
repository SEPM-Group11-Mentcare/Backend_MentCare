const Admin = require("../models/admin");
const Therapist = require("../models/therapist");
const ErrorHandler = require("../utils/errorHandler");
const Patient = require("../models/patient");
const { hashPwd } = require("../middlewares/hash");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middlewares/generateToken");

exports.signup = async (req, res, next) => {
  const password = await hashPwd(req?.body?.password, next);
  let data = {
    username: req?.body?.username,
    name: req?.body?.name,
    password: password,
    nationalID: req?.body?.nationalID,
    specialization: req?.body?.specialization,
    pratisingCertNum: req?.body?.pratisingCertNum,
    role: req.params.role
  };
  try {
    const usernameExistedInPatient = await Patient.findOne({username: data.username});
    const usernameExistedInTherapist = await Therapist.findOne({username: data.username});
    const usernameExistedInAdmin = await Admin.findOne({username: data.username});
    if (usernameExistedInPatient || usernameExistedInTherapist || usernameExistedInAdmin) {
      return next(new ErrorHandler("Username had been existed", 404))
    }
    if (data.role === "patient") {
      await Patient.create(data)
      .then(() => {
        res.status(200).json('Signup successfully')
      })
      .catch((err) => {
        next(new ErrorHandler(err.message, 404))
      })
    } else if (data.role === "therapist") {
      await Therapist.create(data)
        .then(() => {
          res.status(200).json("Signup successfully");
        })
        .catch((err) => {
          next(new ErrorHandler(err.message, 404));
        });
    }
  } catch (err) {
    next(new ErrorHandler(err.message, 404));
  }
};

exports.signin = async (req, res, next) => {
  let data = {
    username: req?.body?.username,
    password: req?.body?.password,
  }

  try {
    const patient = await Patient.findOne({ username: data.username });
    const therapist = await Therapist.findOne({ username: data.username });
    const admin = await Admin.findOne({ username: data.username });
    let user;
    let role;

    if (patient) {
      user = patient;
      role = "patient";
    }

    if (therapist) {
      user = therapist;
      role = "therapist";
    }

    if (admin) {
      user = admin;
      role = "admin";
    }

    if (user) {
      const checkUserPwd = bcrypt.compareSync(data.password, user.password);
      if (checkUserPwd) {
        generateToken(user, 200, res, role);
      } else {
        next(new ErrorHandler("Invalid credentials", 200));
      }
    } else {
      next(new ErrorHandler("Invalid credentials", 200));
    }
  } catch (err) {
    next(new ErrorHandler(err.message, 404));
  }
};

exports.getUserInfo = async(req, res, next) => {
  res.status(200).json(req.userID);
}

exports.signout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
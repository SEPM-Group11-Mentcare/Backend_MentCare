const Admin = require('../models/admin');
const Therapist = require('../models/therapist');
const ErrorHandler = require("../utils/errorHandler");
const Patient = require('../models/patient');
const { hashPwd } = require('../middlewares/hash');
const bcrypt = require('bcryptjs');
const { generateToken } = require("../middlewares/generateToken")

exports.signup = async(req, res, next) => {
  const password = await hashPwd(req?.body?.password, next);
  let data = {
    username: req?.body?.username,
    name: req?.body?.name,
    password: password,
    role: req?.body?.role,
    nationalID: req?.body?.nationalID,
    specialization: req?.body?.specialization,
    pratisingCertNum: req?.body?.pratisingCertNum,
  }

  try {
    const usernameExistedInPatient = await Patient.findOne({username: data.username});
    const usernameExistedInTherapist = await Therapist.findOne({username: data.username});
    const usernameExistedInAdmin = await Admin.findOne({username: data.username});

    if (usernameExistedInPatient || usernameExistedInTherapist || usernameExistedInAdmin) {
      return next(new ErrorHandler("Username had been existed"))
    }
    if (data.role === "Patient") {
      await Patient.create(data)
      .then(() => {
        res.status(200).json('Signup successfully')
      })
      .catch((err) => {
        next(new ErrorHandler(err.message, 404))
      })
    } else if (data.role === "Therapist") {
      await Therapist.create(data)
      .then(() => {
        res.status(200).json('Signup successfully')
      })
      .catch((err) => {
        next(new ErrorHandler(err.message, 404))
      })
    }
  } catch (err) {
    next(new ErrorHandler(err.message, 404))
  }
}

exports.signin = async(req, res, next) => {
  let data = {
    username: req?.body?.username,
    password: req?.body?.password,
    role: req?.body?.role
  }

  try {
    const patient = await Patient.findOne({username: data.username});
    const therapist = await Therapist.findOne({username: data.username});
    const admin = await Admin.findOne({username: data.username});
    let user;

    if (patient) {
      user = patient;
    }

    if (therapist) {
      user = therapist;
    }

    if (admin) {
      user = admin
    }

    if (user) {
      const checkUserPwd = bcrypt.compareSync(data.password, user.password);
      if (checkUserPwd) {
        generateToken(user, 200, res);
      } else {
        next(new ErrorHandler('Invalid credentials', 200))
      }
    } else {
      next(new ErrorHandler('Invalid credentials', 200))
    }
  } catch (err) {
    next(new ErrorHandler(err.message, 404));
  }
}
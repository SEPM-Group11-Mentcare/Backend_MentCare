const Patient = require('../models/patient');
const ErrorHandler = require('../utils/errorHandler');

exports.getPatient = async(req, res, next) => {
    const id = req.userID;
    try {
        console.log(id);
        const patient = await Patient.findById(id)
        .catch((err) => {
          next(new ErrorHandler(err.message, 404))
        })
        // Response
        res.status(200).json(patient);
    }
    catch (err) {
        console.error(err);
        next(new ErrorHandler(err.message, 404));
    }
}
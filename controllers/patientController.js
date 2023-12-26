const Patient = require('../models/patient');
const ErrorHandler = require('../utils/errorHandler');

/* Patient - View profile */
module.exports.getPatient = async (req, res, next) => {
    const id = req.userID;
    try {
        const patient = await Patient.findById(id);
        // Response
        res.status(200).json(patient);
    }
    catch (err) {
        console.error(err);
        next(new ErrorHandler(err.message, 404));
    }
}

/* Patient - Update profile */
module.exports.updateProfile = async (req, res, next) => {
    try {
        const id = req.userID;
        const data = {
            name: req?.body?.name,
            username: req?.body?.username,
            dob: req?.body?.dob,
        }
        const updatedProfile = await Patient.findByIdAndUpdate(id, data, {new: true});
        if (!updatedProfile) {
            return next(new ErrorHandler('Profile not found', 404));
        }
        res.status(200).json(updatedProfile);
    }
    catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
    

}
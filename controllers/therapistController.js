const Therapist = require('../models/therapist');
const ErrorHandler = require('../utils/errorHandler');

// Get all therapists
module.exports.getTherapists = async (req, res, next) => {
    try {
        const therapists = await Therapist.find();
        // Response
        res.status(200).json(therapists);
    }

    catch (err) {
        console.error(err);
        next(new ErrorHandler(err.message, 500));
    }
}

// Get a therapist
module.exports.getTherapist = async (req, res, next) => {
    const id = req.params.id;
    try {
        const therapist = await Therapist.findById({ _id: id });
        // Response
        res.status(200).json(therapist);
    }
    catch (err) {
        console.error(err);
        next(new ErrorHandler(err.message, 404));
    }
}
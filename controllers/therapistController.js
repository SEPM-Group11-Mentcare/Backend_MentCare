const Therapist = require('../models/therapist');
const ErrorHandler = require('../utils/errorHandler');

// Get all therapists with pagination
module.exports.getTherapists = async (req, res, next) => {
    try {
        // Get page number and number of items per page
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = parseInt(req.query.size) || 10;
        // Calculate skip values
        const skip = (page-1) * itemsPerPage;

        const therapists = await Therapist.find().skip(skip).limit(itemsPerPage);
        const total = (await Therapist.find()).length

        // Response
        res.status(200).json({therapists: therapists, total: total});
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
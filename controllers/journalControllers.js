const Journal = require("../models/journal");

// Create Journal has user ID
async function createJournal(req, res, next) {
  try {
    const data = {
      journalTitle: req?.body?.journalTitle,
      journalText: req?.body?.journalText,
      mood: req?.body?.mood,
      patient: req.userID
    }
    const newJournal = await Journal.create(data);
    res.status(200).json({newJournal: newJournal, message: "Create journal successfully"});
  } catch (error) {
    next(error);
  }
}

// Get all journals in the system
async function getJournals(req, res, next) {
  try {
    const journals = await Journal.find();
    res.json(journals);
  } catch (error) {
    next(error);
  }
}

// Get journal by id
async function getJournalById(req, res, next) {
  try {
    const journal = await Journal.findById(req.params.id);
    res.json(journal);
  } catch (error) {
    next(error);
  }
}

// Get journal list by user id
async function getJournalsByUserId(req, res, next) {
  try {
    // const userId = req.params.userId;
    const journals = await Journal.find({ patient: req.userID._id });
    console.log(journals);
    res.status(200).json(journals);
  } catch (error) {
    next(error);
  }
}

// Update a journal
async function updateJournal(req, res, next) {
  try {
    const { journalTitle, journalText, mood } = req.body.journal;
    const userId = req.userID._id;
    const updatedJournal = await Journal.findByIdAndUpdate(
      req.params.id,
      { journalTitle, journalText, mood, userId },
      { new: true }
    );
    res.json(updatedJournal);
  } catch (error) {
    next(error);
  }
}

// Delete a journal
async function deleteJournal(req, res, next) {
  try {
    const deletedJournal = await Journal.findByIdAndDelete(req.params.id);
    res.json(deletedJournal);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createJournal,
  getJournals,
  getJournalsByUserId,
  getJournalById,
  updateJournal,
  deleteJournal,
};

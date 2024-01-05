const Journal = require("../models/journal");

// Create Journal has user ID
async function createJournal(req, res, next) {
  try {
    const { journalTitle, journalText, mood, userId } = req.body;
    const newJournal = await Journal.create({
      journalTitle,
      journalText,
      mood,
      userId,
    });
    res.json(newJournal);
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
    const userId = req.params.userId;
    const journals = await Journal.find({ userId });
    res.json(journals);
  } catch (error) {
    next(error);
  }
}

// Update a journal
async function updateJournal(req, res, next) {
  try {
    const { journalTitle, journalText, mood, userId } = req.body.journal;
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

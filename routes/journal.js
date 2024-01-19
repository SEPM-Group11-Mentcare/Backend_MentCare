const express = require("express");
const {
  createJournal,
  getJournals,
  getJournalsByUserId,
  getJournalById,
  updateJournal,
  deleteJournal,
} = require("../controllers/journalControllers");
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.post("/", isAuthenticated, createJournal);
router.get("/", isAuthenticated, getJournals);
router.get("/patient", isAuthenticated, getJournalsByUserId);
router.get("/:id", isAuthenticated, getJournalById);
router.put("/:id", isAuthenticated, updateJournal);
router.delete("/:id", isAuthenticated, deleteJournal);

module.exports = router;

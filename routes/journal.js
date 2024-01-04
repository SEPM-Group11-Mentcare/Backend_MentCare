// journalRoutes.js

const express = require("express");
const {
  createJournal,
  getJournals,
  getJournalsByUserId, // Add this import
  getJournalById,
  updateJournal,
  deleteJournal,
} = require("../controllers/journalControllers");

const router = express.Router();

router.post("/", createJournal);
router.get("/", getJournals);
router.get("/:id", getJournalById);
router.get("/patient/:userId", getJournalsByUserId);
router.put("/:id", updateJournal);
router.delete("/:id", deleteJournal);

module.exports = router;

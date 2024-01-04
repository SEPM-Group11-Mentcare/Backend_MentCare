const mongoose = require("mongoose");
const Journal = require("./models/journal");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://seem:sepm@sepm.fkieblk.mongodb.net/MentCare?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Dummy data
const dummyData = [
  {
    journalText: "Today was a great day!",
    mood: "Happy",
    userId: "user123",
  },
  {
    journalText: "Feeling a bit tired, but overall okay.",
    mood: "Neutral",
    userId: "user456",
  },
  {
    journalText: "Had a challenging day at work.",
    mood: "Stressed",
    userId: "user123",
  },
  {
    journalText: "Enjoyed a relaxing evening with friends.",
    mood: "Content",
    userId: "user789",
  },
  {
    journalText: "Feeling motivated to start a new project.",
    mood: "Excited",
    userId: "user123",
  },
  {
    journalText: "Had a productive day and completed all tasks.",
    mood: "Accomplished",
    userId: "user456",
  },
  {
    journalText: "Dealing with a minor setback, but staying positive.",
    mood: "Optimistic",
    userId: "user789",
  },
  {
    journalText: "Feeling grateful for the little things in life.",
    mood: "Grateful",
    userId: "user123",
  },
  {
    journalText: "Reflecting on personal growth and achievements.",
    mood: "Reflective",
    userId: "user456",
  },
  {
    journalText: "Facing a creative block, but determined to overcome it.",
    mood: "Frustrated",
    userId: "user789",
  },
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Clear existing data
    await Journal.deleteMany();

    // Insert dummy data
    const result = await Journal.insertMany(dummyData);
    console.log(`${result.length} journal entries inserted successfully.`);
  } catch (error) {
    console.error("Error seeding the database:", error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

// Seed the database
seedDatabase();

const mongoose = require("mongoose");
const Journal = require("./models/journal"); // Replace with the actual file name of your model

mongoose.connect(
  "mongodb+srv://seem:sepm@sepm.fkieblk.mongodb.net/MentCare?retryWrites=true&w=majority",
  {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  // Emoji options for mood
  const moodOptions = [
    "😄",
    "😢",
    "😎",
    "😍",
    "😴",
    "😋",
    "😐",
    "😇",
    "😡",
    "😜",
  ];

  // Function to generate random mood
  const getRandomMood = () =>
    moodOptions[Math.floor(Math.random() * moodOptions.length)];

  // Function to format the date as dd/MM/yy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  // Dummy data array with createdDate included
  const dummyData = [
    {
      journalTitle: "First Entry",
      journalText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      mood: getRandomMood(),
      userId: "user1",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Exciting Day",
      journalText: "Today was an amazing day filled with excitement!",
      mood: getRandomMood(),
      userId: "user2",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Reflecting on Life",
      journalText: "Taking a moment to reflect on the journey of life.",
      mood: getRandomMood(),
      userId: "user1",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Challenges Overcome",
      journalText:
        "Faced some challenges today and successfully overcame them.",
      mood: getRandomMood(),
      userId: "user3",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Relaxing Weekend",
      journalText: "Spent the weekend relaxing and recharging.",
      mood: getRandomMood(),
      userId: "user2",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "New Discoveries",
      journalText: "Discovered something new and fascinating today.",
      mood: getRandomMood(),
      userId: "user3",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Quiet Reflection",
      journalText: "A moment of quiet reflection and gratitude.",
      mood: getRandomMood(),
      userId: "user1",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Random Thoughts",
      journalText: "Jotted down some random thoughts and ideas.",
      mood: getRandomMood(),
      userId: "user2",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Productive Day",
      journalText: "Accomplished a lot today. Feeling productive!",
      mood: getRandomMood(),
      userId: "user3",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Unexpected Joy",
      journalText: "Encountered unexpected moments of joy and happiness.",
      mood: getRandomMood(),
      userId: "user1",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Sunny Day Adventure",
      journalText: "Went on an adventure on this sunny day!",
      mood: getRandomMood(),
      userId: "user2",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Thoughtful Moments",
      journalText: "Reflecting on life's thoughtful moments.",
      mood: getRandomMood(),
      userId: "user3",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Creative Expression",
      journalText: "Expressed creativity through art and writing.",
      mood: getRandomMood(),
      userId: "user1",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Gratitude Journal",
      journalText: "Listing things I'm grateful for today.",
      mood: getRandomMood(),
      userId: "user2",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Night Sky Wonders",
      journalText: "Gazed at the stars and contemplated the universe.",
      mood: getRandomMood(),
      userId: "user3",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Weekend Getaway",
      journalText: "Enjoyed a relaxing weekend getaway in nature.",
      mood: getRandomMood(),
      userId: "user1",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Productive Workday",
      journalText: "Achieved productivity and met work goals.",
      mood: getRandomMood(),
      userId: "user2",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Serene Morning",
      journalText: "Started the day with a peaceful and serene morning.",
      mood: getRandomMood(),
      userId: "user3",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Mindful Meditation",
      journalText: "Practiced mindful meditation to find inner calm.",
      mood: getRandomMood(),
      userId: "user1",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Adventure Awaits",
      journalText: "Anticipating exciting adventures in the near future.",
      mood: getRandomMood(),
      userId: "user2",
      createdDate: formatDate(new Date()),
    },
    {
      journalTitle: "Cozy Evening",
      journalText: "Ended the day with a cozy evening and a good book.",
      mood: getRandomMood(),
      userId: "user3",
      createdDate: formatDate(new Date()),
    },
  ];

  try {
    await Journal.deleteMany({}); // Clear existing data

    const createdEntries = await Journal.create(dummyData);

    console.log(`${createdEntries.length} entries created successfully.`);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
});

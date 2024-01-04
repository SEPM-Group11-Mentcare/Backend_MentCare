const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./middlewares/error");

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

//CONNECT DATABASE
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// IMPORT ROUTES
const accountRoute = require("./routes/account");
const patientRoute = require("./routes/patient");
const adminRoute = require("./routes/admin");
const therapistRoute = require("./routes/therapist");
const scheduleRoute = require("./routes/schedule");
const journalRoute = require("./routes/journal");

// ROUTES MIDDLEWARE
app.use("/api/account", accountRoute);
app.use("/api/patient", patientRoute);
app.use("/api/admin", adminRoute);
app.use("/api/therapist", therapistRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/journals", journalRoute);

// ROUTES MIDDLEWARE

app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

module.exports = app;

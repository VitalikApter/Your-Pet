const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const authRouter = require('././routes/api/auth-routes');
const contactsRouter = require("./routes/api/contacts-routes");
const userPetRouter = require("./routes/api/userPets-routes");
const noticeRouter = require("././routes/api/notices-routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.use('/api/auth', authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/user/pets", userPetRouter);
app.use("/api/notices", noticeRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

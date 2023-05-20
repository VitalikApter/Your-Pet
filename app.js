const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger.json");

require("dotenv").config();

const authRouter = require("././routes/api/auth-routes");
const userPetRouter = require("./routes/api/userPets-routes");
const noticeRouter = require("././routes/api/notices-routes");
const servicesSidebar = require("./routes/api/servicesSidebar-routes");
const news = require("./routes/api/news-routes")

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRouter);
app.use("/api/user/pets", userPetRouter);
app.use("/api/notices", noticeRouter);
app.use("/api/friends", servicesSidebar);
app.use("/api/news", news);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
  
});

module.exports = app;

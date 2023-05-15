const mongoose = require("mongoose");

const app = require("./app");






mongoose.connect("mongodb+srv://Vitalik:ANGELOCHEK2018@cluster0.82avjsn.mongodb.net/db-pets?retryWrites=true&w=majority")
.then(app.listen(3000, () => {
  console.log("Database connection successful");
}))
.catch(error => console.log(error.message));





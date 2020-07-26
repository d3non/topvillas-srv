const express = require("express");
const categories = require("./routes/categories");
const listings = require("./routes/listings");
const listing = require("./routes/listing");
const users = require("./routes/users");
const user = require("./routes/user");
const auth = require("./routes/auth");
const my = require("./routes/my");
const messages = require("./routes/messages");
const expoPushTokens = require("./routes/expoPushTokens");
const helmet = require("helmet");
const compression = require("compression");
const config = require("config");
const app = express();
const mongoose = require("mongoose");

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use("/api/categories", categories);
app.use("/api/listing", listing);
app.use("/api/listings", listings);
app.use("/api/user", user);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/my", my);
app.use("/api/expoPushTokens", expoPushTokens);
app.use("/api/messages", messages);

const MONGODB_URI =
  "mongodb+srv://topadmin:hreBM6Ac6yruni5@cluster0.psozw.mongodb.net/topvillas?retryWrites=true&w=majority";
mongoose.Promise = Promise;
mongoose.set("useCreateIndex", true);
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log("Mongoose connection successfuly.");
  // start the server, listen on port 3000
  const port = process.env.PORT || config.get("port");
  app.listen(port, function () {
    console.log(`Server started on port ${port}...`);
  });
});

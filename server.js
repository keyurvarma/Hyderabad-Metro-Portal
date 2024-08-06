var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
const cors = require("cors");

var app = express();

// Login and Register
require("./auth/auth");
const login = require("./routes/login");
const loggedInPage = require("./routes/loggedInUser");
// ----------------------------------------------------

const bookingRoute = require("./routes/routeSelection");

var registerRouter = require("./routes/register");

const bookingHistory = require("./routes/bookingHistory");
//--------------------------------------------------------

//DB Config
const DB_URL = require("./config/keys").MongoURI;

//connect to mongo
//---------------------------------------------
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    throw err;
  });
//---------------------------------------------
// Making Build Folder as Public

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/api", login);

app.use("/api/routes", bookingRoute);
app.use("/api/register", registerRouter); // To register page
app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  loggedInPage
); //To Secure Route
app.use("/api/bookingHistory", bookingHistory);
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

app.listen(8080, () => {
  console.log(`server running on port ${8080}`);
});

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const dbService = require("./db/dbservice.ts");

/****** PASSPORT STRATEGY SETUP */
passport.use(
  new LocalStrategy((username, password, done) => {
    dbService.getUserByUsername(username, (user, err = null) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (!user) return done(null, false, { message: "Incorrect username." });
      if (!user.password == password) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done((err = null), user);
    });
  })
);

passport.serializeUser(function (user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function (id, callback) {
  db.users.findById(id, function (err, user) {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
});
/******* */
var app = express();

global.jest = require("jest");

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

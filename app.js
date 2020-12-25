var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer");
const jwt = require("jwt-simple");
const dbService = require("./db/dbservice.ts");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    // @response { body: dataValues: { id: int, username: str}}
    const response = await dbService.getUserByUsername(username);
    if (response.error) {
      // User does not exist
      return done((err = response.error));
    } else {
      // Check password
      const hash = response.body.dataValues.password;
      bcrypt.compare(password, hash, (err, result) => {
        // result == true
        if (err) return done((err = "The password was incorrect."));
        else {
          const { id: userId } = response.body.dataValues;
          return done(
            (err = null),
            (token = jwt.encode(userId, process.env.APP_JWT_SECRET))
          );
        }
      });
    }
  })
);
passport.use(
  new BearerStrategy((token, done) => {
    try {
      const userId = jwt.decode(token, process.env.APP_JWT_SECRET);
      dbService.getUserById(userId, (user, err) => {
        return err ? done(err) : done((err = null), (res = token));
      });
    } catch (error) {
      return done(null, false);
    }
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
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(console.log("404"));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;

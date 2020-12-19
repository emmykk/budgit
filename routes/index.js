var express = require("express");
var router = express.Router();
const { insertUser } = require("../db/dbservice.ts");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Console } = require("console");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post("/users", (req, res, next) => {
  insertUser(req.body);
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (!username)
    return res.status(422).json({
      errors: {
        username: "is required",
      },
    });

  if (!password)
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });

  return passport.authenticate(
    "local",
    { session: true },
    (err, passportUser) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      if (passportUser) {
        return res.json({ user: passportUser.dataValues.username });
      }

      return status(400).info;
    }
  )(req, res, next);
});

module.exports = router;

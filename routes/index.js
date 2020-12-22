var express = require("express");
var router = express.Router();
const { insertUser } = require("../db/dbservice.ts");
const { addHousehold } = require("../db/api/household.js");
const { addExpense, getAllExpenses } = require("../db/api/expense.js");
const dbService = require("../db/dbservice.ts");
const passport = require("passport");
const jwt = require("jwt-simple");

router.get("/", (req, res, next) => {
  res.send({ message: "" });
});

router.post("/users", (req, res, next) => {
  insertUser(req.body);
});

router.get(
  "/households",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    if (req.user) res.send({ token: req.user, household: true });
    else res.send({ error: "ERRROR" });
  }
);

router.post(
  "/households",
  passport.authenticate("bearer", { session: false }),
  /**
   * @param {*} req.body expects:
   * name - string
   */
  async (req, res) => {
    const token = req.user;
    if (req.user) {
      const userId = jwt.decode(req.user, process.env.APP_JWT_SECRET).userId;
      const household = { ...req.body, userId };

      if (household.name) {
        // const result = await dbService.getAllUsers();
        console.log("THEE NAME");
        const result = await addHousehold(household);
        console.log(result);
        res.send({ message: result });
      }
    } else
      res.send({ error: "You are not logged in. Please log in to continue" });
  }
);

router.post(
  "/expenses",
  passport.authenticate("bearer", { session: false }),
  /**
   * @param {*} req.body expects:
   * amount - double
   * description - string
   * householdId - integer (store on FE)
   */
  async (req, res) => {
    if (req.user) {
      const userId = jwt.decode(req.user, process.env.APP_JWT_SECRET).userId;
      const expenseData = { ...req.body, UserId: userId };
      try {
        const result = await addExpense(expenseData);
        res.send({ message: result });
      } catch (err) {
        res.send({ message: err });
      }
    } else
      res.send({ error: "You are not logged in. Please log in to continue." });
  }
);

router.get(
  "/expenses",
  passport.authenticate("bearer", { session: false }),
  /**
   * Get expenses for a user's household via a lookup in HouseholdMembers with userId.
   */
  async (req, res) => {
    const token = req.user;
    if (req.user) {
      const userId = jwt.decode(req.user, process.env.APP_JWT_SECRET).userId;
      try {
        const result = await getAllExpenses(userId);
        res.send({ message: result });
      } catch (err) {
        res.send({ message: err });
      }
    } else
      res.send({ error: "You are not logged in. Please log in to continue." });
  }
);

// Can add successRedirect '/' option and failureRedirect: '/login'
router.post(
  "/login",
  passport.authenticate("local", { session: false, failureFlash: true }),
  (req, res) => {
    // authentication was successful.
    // `req.user` contains the authenticated user.
    res.send({ token: req.user });
  }
);

module.exports = router;

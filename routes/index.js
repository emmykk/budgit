var express = require("express");
var router = express.Router();
const { insertUser } = require("../db/dbservice.ts");
const {
  addHousehold,
  getHouseholdByUserId,
  getHouseholdById,
} = require("../db/api/household.js");
const { addExpense, getAllExpenses } = require("../db/api/expense.js");
const dbService = require("../db/dbservice.ts");
const passport = require("passport");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  res.send({ message: "" });
});

router.post("/users", async (req, res) => {
  // req.body has username and password
  const { username, password, email } = req.body;
  const userAlreadyExists = !(
    await dbService.getUserByUsername(username)
  ).hasOwnProperty("error");
  const saltRounds = 10;
  if (userAlreadyExists)
    return res.send({ error: "This username already exists." });
  if (!email || !password || !username)
    return res.send({
      error:
        "A required field is missing. Please check to see you inserted an email, username, and password.",
    });

  try {
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      console.log("HASED");
      console.log(hashedPassword);
      const newUser = await insertUser({
        username,
        password: hashedPassword,
        email,
      });
      res.send(newUser);
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get(
  "/household",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    const token = req.user;
    if (token) {
      const userId = jwt.decode(token, process.env.APP_JWT_SECRET);
      const { householdId } = (await getHouseholdByUserId(userId)).dataValues;
      const household = await getHouseholdById(householdId);
      res.send(household);
    } else res.send({ error: "You mnust be logged in to continue." });
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
      const userId = jwt.decode(req.user, process.env.APP_JWT_SECRET);
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
    const token = req.user;
    if (token) {
      const userId = jwt.decode(token, process.env.APP_JWT_SECRET);
      const { householdId } = (await getHouseholdByUserId(userId)).dataValues;
      const expenseData = {
        ...req.body,
        UserId: userId,
        HouseholdId: householdId,
      };

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
   * If successful, returns an obj with prop body: [ArrayOfExpenses]
   */
  async (req, res) => {
    const token = req.user;
    if (req.user) {
      const userId = jwt.decode(token, process.env.APP_JWT_SECRET);
      try {
        const result = await getAllExpenses(userId);
        res.send(result);
      } catch (err) {
        res.send({ message: err });
      }
    } else
      res.send({ error: "You are not logged in. Please log in to continue." });
  }
);

// Can add successRedirect '/' option and failureRedirect: '/login'
/***
 * Expecting req.body format of:
 * username
 * password
 * see Passport Local Strategy in app.js
 */
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

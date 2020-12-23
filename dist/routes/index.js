var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var express = require("express");
var router = express.Router();
const { insertUser } = require("../db/api/user");
const { addHousehold } = require("../db/api/household");
const { addExpense, getAllExpenses } = require("../db/api/expense");
const passport = require("passport");
const jwt = require("jwt-simple");
router.get("/", (req, res, next) => {
    res.send({ message: "" });
});
router.post("/users", (req, res, next) => {
    insertUser(req.body);
});
router.get("/households", passport.authenticate("bearer", { session: false }), (req, res) => {
    if (req.user)
        res.send({ token: req.user, household: true });
    else
        res.send({ error: "ERRROR" });
});
router.post("/households", passport.authenticate("bearer", { session: false }), 
/**
 * @param {*} req.body expects:
 * name - string
 */
(req, res) => __awaiter(this, void 0, void 0, function* () {
    const token = req.user;
    if (req.user) {
        const userId = jwt.decode(req.user, process.env.APP_JWT_SECRET).userId;
        const household = Object.assign(Object.assign({}, req.body), { userId });
        if (household.name) {
            // const result = await dbService.getAllUsers();
            console.log("THEE NAME");
            const result = yield addHousehold(household);
            console.log(result);
            res.send({ message: result });
        }
    }
    else
        res.send({ error: "You are not logged in. Please log in to continue" });
}));
router.post("/expenses", passport.authenticate("bearer", { session: false }), 
/**
 * @param {*} req.body expects:
 * amount - double
 * description - string
 * householdId - integer (store on FE)
 */
(req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.user) {
        const userId = jwt.decode(req.user, process.env.APP_JWT_SECRET).userId;
        const expenseData = Object.assign(Object.assign({}, req.body), { UserId: userId });
        try {
            const result = yield addExpense(expenseData);
            res.send({ message: result });
        }
        catch (err) {
            res.send({ message: err });
        }
    }
    else
        res.send({ error: "You are not logged in. Please log in to continue." });
}));
router.get("/expenses", passport.authenticate("bearer", { session: false }), 
/**
 * Get expenses for a user's household via a lookup in HouseholdMembers with userId.
 * If successful, returns an obj with prop body: [ArrayOfExpenses]
 */
(req, res) => __awaiter(this, void 0, void 0, function* () {
    const token = req.user;
    if (req.user) {
        const userId = jwt.decode(token, process.env.APP_JWT_SECRET);
        try {
            const result = yield getAllExpenses(userId);
            res.send(result);
        }
        catch (err) {
            res.send({ message: err });
        }
    }
    else
        res.send({ error: "You are not logged in. Please log in to continue." });
}));
// Can add successRedirect '/' option and failureRedirect: '/login'
/***
 * Expecting req.body format of:
 * username
 * password
 * see Passport Local Strategy in app.js
 */
router.post("/login", passport.authenticate("local", { session: false, failureFlash: true }), (req, res) => {
    // authentication was successful.
    // `req.user` contains the authenticated user.
    res.send({ token: req.user });
});
module.exports = router;

var express = require("express");
var router = express.Router();
const { insertUser } = require("../db/dbservice.ts");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/users", function (req, res, next) {
  insertUser(req.body);
});

module.exports = router;

const router = require("express").Router();

router.get("usertests", (req, res) => {
  res.send("user test is successfull");
});

module.exports = router;

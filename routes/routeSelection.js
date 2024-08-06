var express = require("express");
var router = express.Router();
var ticket = require("../models/Ticket");
const User = require("../models/User");
var moment = require("moment");

router.get("/", (req, res) => {
  console.log("hi");
});
router.post("/", async (req, res) => {
  ticket.create(
    {
      transactionId: req.body.transactionId,
      email: req.body.email,
      startStation: req.body.startStation,
      destination: req.body.destination,
      price: req.body.price,
      bookedAt: moment().toISOString(),
      paid: req.body.paid,
    },
    (err, res) => {
      if (err) console.log(err);
    }
  );
});

module.exports = router;

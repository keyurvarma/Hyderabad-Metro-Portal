const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema(
  {
    transactionId: {
      type: String,
    },
    email: {
      type: String,
    },
    startStation: {
      type: String,
    },
    destination: {
      type: String,
    },
    price: {
      type: String,
    },
    bookedAt: {
      type: String,
    },
    paid: {
      type: String,
    },
  },
  { collection: "tickets" }
);

const ticket = mongoose.model("ticket", TicketSchema);

module.exports = ticket;

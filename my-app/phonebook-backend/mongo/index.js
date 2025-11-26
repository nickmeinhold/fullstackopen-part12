const mongoose = require("mongoose");
const Person = require("./models/Person");
const { MONGO_URL } = require("../util/config");

if (MONGO_URL && !mongoose.connection.readyState)
  mongoose.connect(MONGO_URL);

module.exports = {
  Person,
};

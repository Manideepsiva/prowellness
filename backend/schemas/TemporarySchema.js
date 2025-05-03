const mongoose = require("mongoose");

const temporaryUserSchema = new mongoose.Schema({
  usermail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  age: { type: Number, required: true },
});

const TemporaryUser = mongoose.model("TemporaryUser", temporaryUserSchema);
module.exports = TemporaryUser;

const mongoose = require("mongoose");

const technologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const Technology = mongoose.model("Technology", technologySchema);

module.exports = Technology;

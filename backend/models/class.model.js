const { default: mongoose } = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, require: true },
  admin: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
});

const CLass = mongoose.model("Class",classSchema);

module.exports = CLass
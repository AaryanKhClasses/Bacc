const mongoose = require("mongoose");

const SetupSchema = new mongoose.Schema({
  guildID: { type: String, required: true },
  prefix: { type: String, required: true },
  modlogChannel: { type: String, required: true },
  mutedRole: { type: String, required: true },
  yesEmoji: { type: String, required: true },
  noEmoji: { type: String, required: true },
  lvl1Role: { type: String, required: true },
  lvl10Role: { type: String, required: true },
  lvl20Role: { type: String, required: true },
  lvl35Role: { type: String, required: true },
  lvl50Role: { type: String, required: true },
  lvl75Role: { type: String, required: true },
  lvl100Role: { type: String, required: true },
  lastUpdated: { type: Date, default: new Date() }
});

module.exports = mongoose.model('setupSchema', SetupSchema);
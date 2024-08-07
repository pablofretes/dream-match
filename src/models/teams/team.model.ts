const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  img: { type: String },
  id: { type: String },
  _id: false,
});

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  players: {
    type: [PlayerSchema],
    required: true,
  },
});

export default mongoose?.models?.Teams || mongoose.model('Teams', TeamSchema);

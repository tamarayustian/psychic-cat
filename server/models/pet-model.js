const mongoose = require("mongoose");

const petSchema = mongoose.Schema({
  name: String,
  animal: {
    type: String,
    enum: ["cat", "dog", "fish", "unidentified"],
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "unidentified"],
  },
  birthday: Date,
  breed: String,
  weight: Number,
  colour: String,
  description: String,
  condition: {
    type: String,
    enum: ["healthy", "sick", "malnourished", "disabled"],
  },
  tags: Array,
});

module.exports = mongoose.model("pets", petSchema);

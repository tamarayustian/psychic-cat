const mongoose = require("mongoose");

const petSchema = mongoose.Schema({
  animal: {
    type: String,
    enum: ["cat", "dog", "fish"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
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
});

module.exports = mongoose.model("pets", petSchema);

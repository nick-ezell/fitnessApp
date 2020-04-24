const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  exercises: [
    {
      type: { type: String },
      name: { type: String },
      duration: { type: Number },
      weight: { type: Number },
      reps: { type: Number },
      sets: { type: Number },
    },
  ],

  day: {
    type: Date,
    default: Date.now,
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

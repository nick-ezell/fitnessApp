const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },

  exercises: Array,

  totalDuration: {
    type: Number,
    default: function () {
      let total = 0;
      if (this.exercises) {
        this.exercises.forEach((exercise) => {
          total += exercise.duration;
        });
      }
      return total;
    },
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

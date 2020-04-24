const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StatsSchema = new Schema({
  workout: {
    type: Schema.Types.ObjectId,
    ref: "Workout",
  },
});

const Stats = mongoose.model("Stats", StatsSchema);

module.exports = Stats;

const mongoose = require("mongoose");

const DailyReportSchema = new mongoose.Schema(
  {
    mood: {
      type: Number,
      required: true,
    },
    activities: [{
      type: String
    }],
    username: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyReport", DailyReportSchema);

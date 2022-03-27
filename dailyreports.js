const router = require("express").Router();
const User = require("./models/User");
const DailyReport = require("./models/DailyReport");

//CREATE Daily Report
router.post("/", async (req, res) => {
  var activities = []
  const reqBody = req.body;

  if(reqBody.music){
    activities.push(reqBody.music);
  }
  if(reqBody.outdoor){
    activities.push(reqBody.outdoor);
  }
  if(reqBody.meeting){
    activities.push(reqBody.meeting);
  }
  if(reqBody.cooking){
    activities.push(reqBody.cooking);
  }
  if(reqBody.game){
    activities.push(reqBody.game);
  }
  if(reqBody.charity){
    activities.push(reqBody.charity);
  }
  if(reqBody.pets){
    activities.push(reqBody.pets);
  }
  
  const newDailyReport = new DailyReport({
    mood: req.body.moodrate,
    activities: activities,
    username: req.cookies.username
  });
  try {
    const savedDailyReport = await newDailyReport.save();
    res.status(200).sendFile(__dirname + '/public/index.html');
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Daily Report
router.put("/:id", async (req, res) => {
  try {
    const dailyReport = await DailyReport.findById(req.params.id);
    if (dailyReport.username === req.body.username) {
      try {
        const updatedDailyReport = await DailyReport.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedDailyReport);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your reports!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Daily Report
router.delete("/:id", async (req, res) => {
  try {
    const dailyReport = await DailyReport.findById(req.params.id);
    if (dailyReport.username === req.body.username) {
      try {
        await dailyReport.delete();
        res.status(200).json("Report has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your reports!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Daily Report
router.get("/:id", async (req, res) => {
  try {
    const dailyReport = await DailyReport.findById(req.params.id);
    res.status(200).json(dailyReport);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Daily Reports
router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let dailyReports;
    if (username) {
        dailyReports = await DailyReport.find({ username });
    } else {
        dailyReports = await DailyReport.find();
    }
    res.status(200).json(dailyReports);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

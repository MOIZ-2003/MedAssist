const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const upload = multer();
const authCandidate = require("../controller/authCandidate.js");
const candidateSchema = require("../models/candidates/candidateSchema.js");
const dashboard = require("../models/candidates/dashboard.js")
const router = express.Router();

router.post('/loginCandidate', upload.none(), authCandidate.loginCandidate);

router.post("/registerCandidate", upload.none(), authCandidate.registerCandidate);
router.post("/CandidateDetail", upload.none(), authCandidate.CandidateDetail);
router.post("/getCandidateId", async(req,res)=>{
    try {
        const {
            candidateId
        } = req.body;
        console.log(req.body);
        const candidates = await candidateSchema.find({}, { candidateID: 1, _id: req.candidateId});
        const candidateIDs = candidates.map((candidate) => candidate.candidateID);
        res.status(200).json({ candidateIDs });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});
router.post("/getCandidateemail", async(req,res)=>{
    try {
        const {
            candidateId
        } = req.body;
        console.log(req.body);
        const candidates = await candidateSchema.find({}, { candidateID: 1, _id: req.candidateId});
        const candidateEmails = candidates.map((candidate) => candidate.email);
        res.status(200).json({ candidateEmails });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

router.post("/getCandidateemail", async (req, res) => {
  try {
    const { candidateId } = req.body;
    console.log(req.body);

    // Assuming that you have a dashboard model
    const dashboardData = await dashboard.findOne({
      candidateId: candidateId,
    });

    // Respond with the candidate email from the dashboard data
    const candidateEmail = dashboardData ? dashboardData.email : null;
    res.status(200).json({ candidateEmail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
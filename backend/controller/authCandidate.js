const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const Candidate = require("../models/candidates/candidateRegSchema.js");
const Candidate2 = require("../models/candidates/candidateSchema");
const mongoose = require("mongoose");

//REGISTER CANDIDATE
module.exports.registerCandidate = async(req,res)=>{
    try{
        const {
            email,
            password,
            type
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newCandidate = new Candidate({
            _id: new mongoose.Types.ObjectId(),
            email, 
            password:passwordHash,
            type
        });
        function generateId() {
          const length = 8;
          const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";
          let id = "";
          for (let i = 0, n = charset.length; i < length; ++i) {
            id += charset.charAt(Math.floor(Math.random() * n));
          }
          return id;
        }
        const candId = generateId();
        const newCandidate2 = new Candidate2({
          _id: new mongoose.Types.ObjectId(),
          candidateID:  candId
        });
        const savedCandidate = await newCandidate.save();
        const savedCandidate2 = await newCandidate2.save();
        res.status(201).json({candidateId: savedCandidate2['candidateID']});
    } catch(err){
        res.status(500).json({error: err.message});
    }

};


module.exports.loginCandidate = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const candidate  = await Candidate.findOne({"email": email});
        if (!candidate) {
          return res.status(400).json({ msg: "Candidate does not exist" });
        }
    
        if (!candidate.password) {
          return res.status(400).json({ msg: "No password set for this candidate" });
        }
        const isMatch = await bcrypt.compare(password, candidate.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

        //if (!candidate.isEmailVerified||!candidate.isMobileVerified) return res.status(400).json({msg: "Please verify your email and mobile phone before logging in."});

        //const token = jwt.sign({id: candidate._id}, process.env.JWT_SECRET);
        delete candidate.password;
        res.status(201).json({candidate});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

module.exports.CandidateDetail = async(req,res)=>{
  try{
      const {
        candidateid,
        name,
        age,
        birthdate,
        comments,
          type
      } = req.body;
      const candidate  = await Candidate.findOne({"email": email});
        if (!candidate) {
          return res.status(400).json({ msg: "Candidate does not exist" });
        }

      
      const candId = generateId();
      const newCandidate2 = new Candidate2({
        _id: new mongoose.Types.ObjectId(),
        candidateID:  candId
      });
      const savedCandidate = await newCandidate.save();
      const savedCandidate2 = await newCandidate2.save();
      res.status(201).json({candidateId: savedCandidate2['candidateID']});
  } catch(err){
      res.status(500).json({error: err.message});
  }

};

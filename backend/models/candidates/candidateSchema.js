const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    password: { type: String, required: true, min: 5 },
    email: { type: String, required: true },
    type: { type: String, required: true, default: "" }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;

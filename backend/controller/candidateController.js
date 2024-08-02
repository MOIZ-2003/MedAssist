// candidateController.js

const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidates/candidateSchema.js');

router.get('/getEmail/:candidateId', async (req, res) => {
    try {
        const { candidateId } = req.params;
        const candidate = await Candidate.findById(candidateId);

        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        res.status(200).json({ email: candidate.email });
    } catch (error) {
        console.error('Error fetching email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

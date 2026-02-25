// routes/donationRoutes.js

const express = require('express');
const router = express.Router();
const { submitDonation } = require('./donationcontroller');  // Import the controller

// POST route to submit donation
router.post('/submitdonation', submitDonation);

module.exports = router;

const express = require('express');
const router = express.Router();

const path = require('path');
const Donation = require('./donation'); // Make sure this model exists and is correct

// controllers/donationController.js
 // Assuming you have a Donation model

const submitDonation = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      quantity,
      foodType,
      perishability,
      expiry,
      locationText,
      latitude,
      longitude
    } = req.body;

    console.log(quantity);

    // Create a new donation entry
    const donation = new Donation({
      name,
      quantity,
      foodType,
      perishability,
      expiry,
      locationText,
      latitude,
      longitude
    });

    // Save donation to DB
    await donation.save();

    // Send success response with a message
    res.render("Donor/donatefood", { message: "Food Posted Successfully!" });
      
  } catch (error) {
    console.error('Donation submission error:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  submitDonation
};

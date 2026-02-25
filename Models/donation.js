const mongo = require('mongoose');

const donationSchema = new mongo.Schema({
 name:{
    type:String
 },
  quantity: {
    type: String, // keeping it string to allow values like "Estimated: ~5kg"
  },
  foodType: {
    type: String,
    enum: ['veg', 'non-veg'],
 
  },
  perishability: {
    type: String,
    enum: ['perishable', 'non-perishable'],
  },
  expiry: {
    type: Date,
  },
  locationText: {
    type: String,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongo.model('Donation', donationSchema);
module.exports = Donation;

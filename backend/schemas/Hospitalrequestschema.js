const mongoose = require('mongoose');

// Define the schema for hospital requests
const hospitalRequestSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    
  },
  phone: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  address: {
    type: String,
    
  },
  state: {
    type: String,
    
   
  },
  district: {
    type: String,
    
  },

    document1: {
      type: String, // File path
      
    },
    document2: {
      type: String,
      
    },
    document3: {
      type: String,
      
    },
    document4: {
      type: String,
      
    },

});

// Export the model
module.exports = mongoose.model('HospitalRequest', hospitalRequestSchema);

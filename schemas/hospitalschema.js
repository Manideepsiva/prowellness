const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        
    },
    price: {
        type: Number,
        
    }
});

// Define the main hospital schema
const hospitalSchema = new mongoose.Schema({
    State: {
        type: String,
        
    },
    District: {
        type: String,
       
    },
    Specialities: {
        type: String,
       
    },
    tests: {
        type: [testSchema],
        default: []
    },
    mitraContactNumber: {
        type: String,
        
    },
    nameOfHospital: {
        type: String,
       
    },
    Address:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }

});

// Create a model based on the schema
const hospmodel = mongoose.model('Hospital', hospitalSchema, 'hospital'); 
module.exports = hospmodel;






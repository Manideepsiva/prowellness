const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords

// Define the admin schema
const adminSchema = new mongoose.Schema({
    usermail: {
        type: String,
        required: true,
        unique: true, // Ensures that each usermail is unique
        trim: true,   // Trims whitespace from the start and end
    },
    password: {
        type: String,
        required: true,
    },
});



// Create the admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

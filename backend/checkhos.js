const mongoose = require('mongoose');
const hospmodel = require('./schemas/hospitalschema'); // Adjust the path to where the model is located

async function getHospitalsInGuntur() {
  try {
    // Connect to the database
    await mongoose.connect('mongodb://localhost:27017/project-nexus-react', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Query to find hospitals in Andhra Pradesh and Guntur
    const hospitals = await hospmodel
      .find({ State: "ANDHRA Pradesh", District: "VISHAKAPATANAM" })
      .select('nameOfHospital -_id'); // Include `nameOfHospital`, exclude `_id`

    console.log('Hospitals in Guntur:', hospitals);
    
    // Close the database connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error fetching hospitals:', error);
  }
}

// Execute the function
getHospitalsInGuntur();
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

  userid:{
    type:String
  },
  patientName: {
    type: String
  },
  testname:{
    type:String
  },
  testprice:{
     type:Number
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  
  },
 
    area: {
      type: String,
   
    },
    city: {
      type: String,
     
    },
    state: {
      type: String,
  
    },
    postalCode: {
      type: String,
     
    },
 
  appointmentDate: {
    type: Date,
   
  },
  timeSlot: {
    type: String,

  },
  additionalInfo: {
    type: String,
  
  },

  hospitalid:{
    type:String
},
hospitalname:{
  type:String
},
bookedDate:{
    type:Date,
    default:Date.now
},
transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
documentPath: { type: String },
patientstatus:{
  type:Number,
  default:1
},
cancelled:{
  type:Number
},
cancelledby:{
  type:Number
}

});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

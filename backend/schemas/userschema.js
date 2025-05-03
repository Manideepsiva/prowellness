const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema  = mongoose.Schema;
const userSchema = new schema({
       
     usermail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
      type:String
    },
    age:{
      type:Number
    }
})
userSchema.pre('save', async function (next) {
    const user = this;
    
    if (!user.isModified('password')) {
      return next();
    }
  
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  
    next();
  });

 const user = mongoose.model('users',userSchema);

 module.exports = user;



const mongoose = require("mongoose");


const schema  = mongoose.Schema;
const Testschema = new schema({
       
    id: Number,
    tests: [String]
})


 const testnames = mongoose.model('Tests',Testschema);

 module.exports = testnames;


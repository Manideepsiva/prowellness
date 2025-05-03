const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true }, // Reference to Appointment
    amount: { type: Number, required: true },
    paymentMethod: { type: String, }, 
    transactionDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

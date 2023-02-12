const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    client_id:{
        type: String,
        required: true,
        trim: true
    },
    loan_id:{
        type: String,
        required: true,
        trim: true
    },
    particular:{
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    debit:{
        type: Number,
        required: true,
        trim: true
    },
    credit:{
        type: Number,
        required: true,
        trim: true
    },
    paymentdate:{
        type:Date,
        required:true,
    }
},
{
    timestamps:true
});

const Payment = mongoose.model('payments',paymentSchema);

module.exports = Payment;
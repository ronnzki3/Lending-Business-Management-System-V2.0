const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loanSchema = new Schema({
    client_id:{
        type: String,
        required: true,
        trim: true
    },
    loantype:{
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    loanamount:{
        type: Number,
        required: true,
        trim: true
    },
    loanterm:{
        type: Number,
        required:true,
        trim: true
    },
    releasedate:{
        type:Date,
        required:true,
    }
},
{
    timestamps:true
});

const Loan = mongoose.model('loan',loanSchema);

module.exports = Loan;
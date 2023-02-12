"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paymentSchema = new Schema({
  client_id: {
    type: String,
    required: true,
    trim: true
  },
  loan_id: {
    type: String,
    required: true,
    trim: true
  },
  particular: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  debit: {
    type: Number,
    required: true,
    trim: true
  },
  credit: {
    type: Number,
    required: true,
    trim: true
  },
  paymentdate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});
var Payment = mongoose.model('payments', paymentSchema);
module.exports = Payment;
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var clientSchema = new Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  mname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  lname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  address: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  contact: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
});
var Client = mongoose.model('client', clientSchema);
module.exports = Client;
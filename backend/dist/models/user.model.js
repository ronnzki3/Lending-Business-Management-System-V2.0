"use strict";

var mongose = require('mongoose');
var Schema = mongose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});
var User = mongose.model('user', userSchema);
module.exports = User;
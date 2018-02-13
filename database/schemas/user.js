'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: String,
  memberNo: { type: String},
  updatedAt: { type: Date, required: true, default: Date.now },
});

UserSchema.methods.getUser = function(){
  return {name: "Sergiu", birthday: Date.now()};
};

// UserSchema.pre('save', function(next) {
//
//   this.updatedAt = Date.now();
//   console.log('Updating the document with date: '+this.updatedAt);
//
//     next();
//
// });

function getSchema() {
  return UserSchema;
}

exports.getSchema = getSchema;
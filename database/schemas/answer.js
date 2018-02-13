'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  _id: String,
  type: String,
  updatedAt: { type: Date, required: true, default: Date.now },
});

AnswerSchema.methods.getAnswer = function(){
  return {title: "Answer title", updateAt: Date.now()};
};

function getSchema() {
  return AnswerSchema;
}

exports.getSchema = getSchema;
// FormDataModel.js
const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  diseases: [{ type: String, required: true }],
  birthdate: { type: Date, required: true },
  comments: { type: String },
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = FormDataModel;

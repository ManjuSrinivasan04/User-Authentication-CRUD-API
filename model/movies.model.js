const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
 name: {
  type: String, 
  required: true,
 },
 released_on: {
  type: Date,
  required: true
 }
});
module.exports = mongoose.model('Movie', MovieSchema)
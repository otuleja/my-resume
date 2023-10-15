const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  videos: [{
    name: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    },
    bucket: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: false
    }
  }]
})

const Course = mongoose.model('courses', courseSchema);
module.exports = Course;
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
})

const Course = mongoose.model('courses', courseSchema);
module.exports = Course;
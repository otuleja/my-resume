const mongoose = require('mongoose');
const Course = require('./models/CourseModel')
require('dotenv').config()


async function pushToMongo(config) {
  mongoose.set('strictQuery', true)
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    const course = new Course(config.data);
    course.save().then((doc) => {
      console.log("new document", doc)
    }).catch((err) => {
      console.log("error creating document", err)
    }).finally(() => {
      mongoose.connection.close()
      return
    })

  })

}

// pushToMongo({ data: { name: "React" } })

async function updateInMongo(config) {
  mongoose.set('strictQuery', true)
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.once('open', async () => {
    const course = await Course.findById(config.id)
    course.videos.push(config.video)
    course.save().then((doc) => {
      console.log("new document", doc)
    }).catch((err) => {
      console.log("error creating document", err)
    }).finally(() => {
      mongoose.connection.close()
      return
    })
  })
}

updateInMongo({
  id: "652a9aef22c38a714b42b7dd", video: {
    name: "Lesson 6", key: "lesson-6.mp4", bucket: "react-class-videos", order: 6,
    breakpoints: [
      {
        timestamp: 0,
        text: "Intro"
      },
      {
        timestamp: 34,
        text: "Typical Form Submission"
      },

      {
        timestamp: 136,
        text: "Handling Forms in React"
      },
      {
        timestamp: 466,
        text: "State - controlled components"
      },

      {
        timestamp: 1022,
        text: "Single state/handler"
      },

      {
        timestamp: (23 * 60) + 50,
        text: "Conclusion"
      },

    ]



  }
})
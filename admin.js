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
    name: "Lesson 10", key: "lesson-10.mp4", bucket: "react-class-videos", order: 10,
    breakpoints: [
      {
        timestamp: 0,
        text: "Intro"
      },
      {
        timestamp: 47,
        text: "Fetching todos from firebase"
      },
      {
        timestamp: (5 * 60) + 7,
        text: "Fetching data as array?"
      },
      {
        timestamp: (6 * 60) + 41,
        text: "Storing todos in state"
      },
      {
        timestamp: (12 * 60) + 41,
        text: "Convert to array"
      },
      // {
      //   timestamp: (13 * 60) + 22,
      //   text: "Disable button"
      // },
      {
        timestamp: (18 * 60) + 35,
        text: "Conclusion"
      }
    ]
  }
})




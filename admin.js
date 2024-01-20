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


// Lesson 24
// 0:00 Intro
// 0:28 Change to category logic
// 2:13 modify card component?
// 04:12 ish add overdue logic
// 07:44 Overdue component
// 12:26 Add tooltip
// 16:23  filter by overdue
// 19:00 Conclusion

updateInMongo({
  id: "652a9aef22c38a714b42b7dd", video: {
    name: "Lesson 24", key: "lesson-24.mp4", bucket: "react-class-videos", order: 24,
    breakpoints: [
      {
        timestamp: 0,
        text: "Intro"
      },
      {
        timestamp: 28,
        text: "Change to category logic"
      },
      {
        timestamp: (2 * 60) + 13,
        text: "Modify card component?"
      },
      {
        timestamp: (4 * 60) + 12,
        text: "Add overdue logic"
      },
      {
        timestamp: (7 * 60) + 44,
        text: "Overdue component"
      },
      {
        timestamp: (12 * 60) + 26,
        text: "Add tooltip"
      },
      {
        timestamp: (16 * 60) + 23,
        text: "Filter by overdue"
      },
      {
        timestamp: (19 * 60) + 0,
        text: "Conclusion"
      }
    ]
  }
})




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


// Lesson 25
// 0:00 Intro
// 1:22 Loading component
// 2:51 Modifying state in EditTodo
// 7:54 fetch todo from db
// 10:59Handle  handle bad todoId
// 15:19 Loading state on home page
// 18:48 Conclusion

updateInMongo({
  id: "652a9aef22c38a714b42b7dd", video: {
    name: "Lesson 25", key: "lesson-25.mp4", bucket: "react-class-videos", order: 25,
    breakpoints: [
      {
        timestamp: 0,
        text: "Intro"
      },
      {
        timestamp: 82,
        text: "Loading component"
      },
      {
        timestamp: (2 * 60) + 51,
        text: "Modifying state in EditTodo"
      },
      {
        timestamp: (7 * 60) + 54,
        text: "Fetch todo from db"
      },
      {
        timestamp: (10 * 60) + 59,
        text: "Handle bad todoId"
      },
      {
        timestamp: (15 * 60) + 19,
        text: "Loading state on home page"
      },
      // {
      //   timestamp: (16 * 60) + 23,
      //   text: "Filter by overdue"
      // },
      {
        timestamp: (18 * 60) + 48,
        text: "Conclusion"
      }
    ]
  }
})




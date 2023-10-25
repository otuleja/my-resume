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
    name: "Lesson 5", key: "lesson-5.mp4", bucket: "react-class-videos", order: 5,
    breakpoints: [
      {
        timestamp: 0,
        text: "Intro"
      },
      {
        timestamp: 75,
        text: "SPA vs non-SPA"
      },

      {
        timestamp: 279,
        text: "Componentize Todos"
      },

      {
        timestamp: 460,
        text: "Configuring React Router"
      },

      {
        timestamp: 718,
        text: "Creating Add Component"
      },

      {
        timestamp: 802,
        text: "/add Route"
      },

      {
        timestamp: 884,
        text: "Configuring Add Component"
      },

      {
        timestamp: 1560,
        text: "Conclusion"
      },

    ]



  }
})
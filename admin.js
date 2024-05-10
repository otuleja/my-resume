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

// pushToMongo({ data: { name: "JavaScript Array Methods" } })

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

// // Lesson 35
// // Intro
// // 0:23 install firebase cli
// // 2:14 initialize hosting
// // 4:38 first deploy and troubleshooting
// // 7:54 second deploy - success!
// // 9:18 Final thoughts

updateInMongo({
  id: "663def7cbfcb284fddb6f08b", video: {
    name: "Lesson 3 - filter()", key: "filter.mp4", bucket: "js-array-class", order: 1,
    breakpoints: [
      {
        timestamp: 0,
        text: "Intro"
      },
      {
        timestamp: (1 * 60) + 28,
        text: "Filtering with for loop"
      },
      {
        timestamp: (5 * 60) + 0,
        text: "JS array method"
      },
      {
        timestamp: (8 * 60) + 14,
        text: "Alternative return statements"
      },
      {
        timestamp: (10 * 60) + 54,
        text: "Accessing index"
      },
      // {
      //   timestamp: (21 * 60) + 5,
      //   text: "Sign up user"
      // },
      // {
      //   timestamp: (25 * 60) + 26,
      //   text: "Redirect component"
      // },
      {
        timestamp: (13 * 60) + 15,
        text: "Conclusion"
      }
    ]
  }
})




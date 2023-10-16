const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
const S3 = require('aws-sdk/clients/s3');

const apiRoutes = require('./routes/api')
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
const mongoose = require('mongoose');
const Course = require('./models/CourseModel')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes)
const port = process.env.PORT || 3000;


app.get("/health", async function (req, res) {
  res.send("Hello world")
})

app.get("/", async function (req, res) {
  res.render('index', { name: 'Johnnnn' });
})

app.get("/courses", async function (req, res) {
  Course.find({}).then(function (courses) {
    res.render('courses', { courses });
  })
})


app.get("/course/:id", async function (req, res) {
  console.log("req.params", req.params)
  const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  });

  Course.findById(req.params.id).then(function (course) {
    course.videos = course.videos || []
    course.videos = course.videos.sort((a, b) => a.order - b.order)
    res.render('course', { course });
  })

  // const a = (props = {}) => {
  //   //gets list of objects in given bucket
  //   return s3.listObjects(props, function (err, data) {
  //     if (err) console.log("err", err, err.stack); // an error occurred
  //     if (data.Contents && data.Contents.length) {
  //       data.Contents.forEach((o) => {
  //         const key = o.Key;
  //         console.log("key", key)
  //       });

  //     } else {
  //       return null
  //     }
  //   });
  // };
  // const result = await a({ Bucket: "react-class-videos" });
  // console.log("result", result)

})

// app.get("/video/:courseid/:videoid", async function (req, res) {

//   res.render("video")
// })


// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// })

app.listen(port, async () => {
  console.log(`Server running on port ${port}` + (process.env.MONGO_URI))
  console.log("1", MONGO_URI)
  console.log("2", $MONOGO_URI)
  mongoose.set('strictQuery', true)
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
  })
}
)
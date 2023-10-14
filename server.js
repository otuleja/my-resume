const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
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




// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// })

app.listen(port, async () => {
  console.log(`Server running on port ${port}`)
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
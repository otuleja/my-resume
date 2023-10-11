const express = require('express')
const path = require('path')
const app = express()


app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3000;
app.get("/", async function (req, res) {
  res.send("Hello world")
})

// app.get("/", async function (req, res) {
//   res.render('index', { name: 'Johnnnn' });
// })

// app.get("/about", async function (req, res) {
//   res.render('about', { name: 'Owen' });
// })




// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// })


// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// })

app.listen(port, () => console.log(`Server running on port ${port}`))
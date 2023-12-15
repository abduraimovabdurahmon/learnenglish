require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const cookies = require("cookie-parser");
const { engine } = require('express-handlebars');

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookies());

// view engine
app.engine('.hbs', engine({extname: 'hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'))


// captcha
app.use("/captcha", require("./routes/captcha"));

// captcha middleware
app.use(require("./middlewares/captcha"));


// routes
app.use("/", require("./routes/home"));

// courses
app.use("/courses", require("./routes/courses"));

// vocabulary
app.use("/vocabulary", require("./routes/vocabulary"));

// about
app.use("/about", require("./routes/about"));

// contact
app.use("/contact", require("./routes/contact"));


module.exports = app;

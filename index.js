
// external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const loginRouter = require('./router/loginRouter')
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/inboxRouter');
const router = express.Router();


// internal imports
const {notFoundHandler, defaultErrorHandler} = require('./middleware/common/errorHandaler')

const app = express();
dotenv.config();

console.log("starting express", __dirname)


// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(()=> console.log("database connection established")).catch((err)=> console.log(err));


// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// console.log(path.join(__dirname, "../public/styles/style"))

// set static folder
app.use(express.static(path.join(__dirname, "public")));


// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));


// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);


// 404 not found
app.use(notFoundHandler);

// error handling
app.use(defaultErrorHandler);


app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT} `);
})
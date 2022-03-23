const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const cors =require('cors')
const authRouter = require('./routes/auth.routes')
const TodossRouter = require('./routes/todomanager.routes')
const usersRouter = require('./routes/user.routes')

const connectToDB = require('./config/db')
connectToDB();

/*const connectToDB = () => {
  mongoose.connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}*/

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/auth', authRouter)
app.use('/Todos', TodossRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
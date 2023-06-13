const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./configs/mongoose-config');
require('./configs/passport-config');

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const originLinks = process.env.ORIGIN_LINKS? process.env.ORIGIN_LINKS.split(','):[]; 
const corsOptions = {
  origin:originLinks,
  optionsSuccessStatus: 200,
};
app.options('*', cors(corsOptions));

app.use('/posts', cors(corsOptions), postsRouter);
app.use('/users', cors(corsOptions), usersRouter);

module.exports = app;

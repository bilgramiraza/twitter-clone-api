const mongoose = require('mongoose');
require('dotenv').config();

const mongoose = require('mongoose');
const mongodbURI = process.env.MONGODB_URI;
const mongodbParams = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(mongodbURI, mongodbParams);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//DB Config 
require('./config/db')

const app = express();
var routes = require('./routes/poll.js');

// Set public folder
app.use('/views', express.static(process.cwd() + '/views'));
app.set('view engine', 'ejs');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Enable CORS
app.use(cors());

routes(app);
const port = 3000;

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
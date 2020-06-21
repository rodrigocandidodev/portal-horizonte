const express   = require('express');
const cors      = require('cors'); //cross-origin resource sharing

require('dotenv').config(); //this makes possible to use .ENV

const app       = express();
const routes    = require('./routes');
const port      = process.env.LISTEN_PORT; //port where the app will listen on for connections

app.use(cors()); //this allows external apps to connect to this api
app.use(express.json()); //it enables writing and reading in JSON format
app.use('/api',routes); //every route defined in routes.js will start with /api

app.listen(port,console.log(`Listening on port ${port}`)); //this starts the server
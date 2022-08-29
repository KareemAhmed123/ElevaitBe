const mongoose = require('mongoose');
// const morgan = require('morgan');
const cors = require('cors');

mongoose.Promise = global.Promise;
global.mongoose = mongoose;
mongoose.plugin(schema => {
    schema.options.usePushEach = true;
});
const bodyParser = require('body-parser');

require('./db');
const express = require('express');
global.express = express;

const app = express();

const mainRouter = require('./routes');

const server = app.listen(8000, () => {
    console.warn(
        { labels: { Keys: 'Start up' } },
        `App is running at: localhost:${8000}`
    );

});


app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        return res.status(400).json({
            status: 'failed',
            message: 'Enter a valid JSON object.'
        });
    }
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    return next();
});

app.use(cors());

//event emiter

const EventEmitter = require('events');

global.bus = new EventEmitter();

//use morgan to log requests to the console



app.use(bodyParser.json({ limit: '1mb' }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', mainRouter);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });
global.async = require('async');

module.exports = app;

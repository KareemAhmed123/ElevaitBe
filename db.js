const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb://doc_viewer:password@94.130.203.236:27022/?authSource=doc_viewer&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const config = {
    socketTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 30000,
    dbName: 'doc_viewer', 
    
};
mongoose.connect(mongoDB, config);
console.log("hi")
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.on('connected',   console.log('MongoDB connected at port 27022'));

var mongoose = require('mongoose');
// console.log(process.env);
var dbURI = process.env.MONGODB_URL;

mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected ');
});
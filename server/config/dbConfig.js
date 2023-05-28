const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
mongoose.connect("mongodb://127.0.0.1:27017/shey-movies")

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongo DB Connetion Successfull');
})

connection.on('error', (err) => {
    console.log('Mongo DB Connetion Failed');
})
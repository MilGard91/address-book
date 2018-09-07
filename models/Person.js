const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PersonSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    city: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});
const Person = mongoose.model('persons', PersonSchema);

module.exports = { Person };
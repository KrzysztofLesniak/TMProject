'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RandomNumberSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    id: {
        type: Number,
        required: true
    }
});

// Create collection and add schema
const RandomNumber =
    mongoose.model('RandomNumber', RandomNumberSchema);

module.exports = RandomNumber;

//podłączyć baze danych !!!
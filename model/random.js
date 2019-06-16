'use strict';
const RandomNumber = require("../model/RandomNumber");

var Pusher = require('pusher');
var pusher = new Pusher({
    appId: '788802',
    key: '6f7f9a1e1b63ae36b3c4',
    secret: '41ededb8317a408379b2',
    cluster: 'eu',
    encrypted: true
});
var b = 0;
module.exports = function() {

    function saveNewRandomNumber() {
        let a = Math.round(Math.random() * 10);
        const num1 = new RandomNumber({
            value: a,
            id: b,
            date: new Date()
        });
        num1.save().then(newRandomNumber => {
            pusher.trigger('myChannel', 'myEvent', {
                value: parseInt(newRandomNumber.value),
                id: newRandomNumber.id,
            });
            b = b + 1;
        });
        var rand = Math.floor(Math.random() * (10 - 2 + 1) + 2);
        //Generate Random number between 5 - 10
        setTimeout(saveNewRandomNumber, rand * 1000);
    }
    saveNewRandomNumber()
}
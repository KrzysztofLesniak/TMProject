'use strict';

const RandomNumbers = require("../model/RandomNumber");


var rand = require('../model/random.js');





var allData = RandomNumbers.find({}, function(err, results) {
        allData = results;
    })
    .sort({ 'date': -1 })
    .limit(1)

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', { randomNumbers: allData });
    });
    app.get('/getNumber', function(req, res) {

        rand();

        return res.json({ success: true, message: "Aktualizacje są przeprowadzane poprawnie" });
    });

}
"use strict";

var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
console.log(petsPath);

app.get("/pets", function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, data) {
    var pets = JSON.parse(data);
    res.send(pets);
  });
});
app.get("/pets/0", function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, data) {
    var pets = JSON.parse(data);
    res.send(pets[0]);
  });
});
app.get("/pets/1", function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, data) {
    var pets = JSON.parse(data);
    res.send(pets[1]);
  });
});

app.get("/pets/2", function(req, res){
  fs.readFile(petsPath, 'utf8', function() {
    res.sendStatus(404);
  });
});

app.get("/pets/-1", function(req, res){
  fs.readFile(petsPath, 'utf8', function() {
    res.sendStatus(404);
  });
});

app.listen('3000', function(){
  //console.log('listening on port 3000');
});

module.exports = app;

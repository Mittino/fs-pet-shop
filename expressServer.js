"use strict";

var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post("/pets", function(req, res){
  var name=req.body.name;
  var age=req.body.age;
  var type=req.body.type;
  console.log(name, age, type);
  res.send(req.body);
});

app.listen('3000', function(){
  //console.log('listening on port 3000');
});

module.exports = app;

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
// app.get("/pets/0", function(req, res){
//   fs.readFile(petsPath, 'utf8', function(err, data) {
//     var pets = JSON.parse(data);
//     res.send(pets[0]);
//   });
// });
// app.get("/pets/1", function(req, res){
//   fs.readFile(petsPath, 'utf8', function(err, data) {
//     var pets = JSON.parse(data);
//     res.send(pets[1]);
//   });
// });
//
// app.get("/pets/2", function(req, res){
//   fs.readFile(petsPath, 'utf8', function() {
//     res.sendStatus(404);
//   });
// });
//
// app.get("/pets/-1", function(req, res){
//   fs.readFile(petsPath, 'utf8', function() {
//     res.sendStatus(404);
//   });
// });

app.get("/pets/:index", function(req, res){
  var index = Number.parseInt(req.params.index);
  fs.readFile(petsPath, 'utf8', index, function(err, data) {
    var pets = JSON.parse(data);
    console.log(pets[index]);
    if (index > pets.length || index < 0){
       return res.sendStatus(404);
    }
    res.send(pets[index]);
  });
});

app.post("/pets", function(req, res){
    var name=req.body.name;
    var age=Number.parseInt(req.body.age);
    var kind=req.body.kind;

    if (Number.isNaN(age) || name === undefined || kind === undefined || age === undefined){
      return res.sendStatus(400);
    }
    fs.readFile(petsPath, 'utf8', function(err, data) {
      var pets = JSON.parse(data);
      pets.push(req.body);
      var petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, function(writeErr){
        if (writeErr) {
          throw writeErr;
        }
      });
    });
    res.send(req.body);
});

app.listen('3000', function(){
  console.log('listening on port 3000');
});

module.exports = app;

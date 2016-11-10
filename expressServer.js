"use strict";

var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
console.log(petsPath);

app.get("/pets", function(req, res){
//res.send("HELLO THERE" + petsPath);

  fs.readFile(petsPath, 'utf8', function(err, data) {

    if (err) {
      throw err;
    }

    var index = process.argv[3];
    var pets = JSON.parse(data);

    if (index !== undefined){
      res.send((pets[index]));
    }
    if (index === undefined){
      res.send((pets));
    }
    else if (index > pets.length || pets.length > 3){
        res.send((`ERROR`));
        process.exit(1);
      }

  });
});

app.listen('3000', function(){
  console.log('listening on port 3000');
  //console.log(petsPath);
});

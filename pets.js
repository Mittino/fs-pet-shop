"use strict";

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
console.log(process.argv);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];


if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {

    if (err) {
      throw err;
    }

    var index = process.argv[3];
    var pets = JSON.parse(data);

    if (index !== undefined){
      console.log(pets[index]);
    }
    if (index > pets.length || index < 0){
        console.error(`Usage: ${node} ${file} read INDEX`);
        process.exit(1);
      }
    console.log(pets);
  });
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    console.log(pets);
    var pet = {
      age: parseInt(process.argv[3]),
      kind: process.argv[4],
      name: process.argv[5],
    };
    console.log(pet);
    console.log(process.argv.length);

    if (process.argv.length < 5) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    pets.push(pet);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pet);
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create]`);
  process.exit(1);
}

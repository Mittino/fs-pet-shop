"use strict";

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
//console.log(process.argv);
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
    if (index === undefined){
      console.log(pets);
    }
    else if (index > pets.length || pets.length > 3){
        console.error(`Usage: ${node} ${file} read INDEX`);
        process.exit(1);
      }

  });
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var pet = {
      age: parseInt(process.argv[3]),
      kind: process.argv[4],
      name: process.argv[5],
    };

    if (process.argv.length < 6) {
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
else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }
    var index = process.argv[3];
    var pets = JSON.parse(data);
    var pet = {
      age: parseInt(process.argv[4]),
      kind: process.argv[5],
      name: process.argv[6],
    };

    if (process.argv.length < 7 || process.argv.length >7) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    pets[index] = pet;

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet);
    });
  });
}
else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }
    var index = process.argv[3];
    var pets = JSON.parse(data);
    console.log(process.argv.length);
    if (process.argv.length < 4 || process.argv.length > 4) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    pets.splice(index, 1);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}

"use strict";

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
console.log(process.argv);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var index = process.argv[3];
console.log(index);


if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {

    var pets = JSON.parse(data);

    if (err) {
      throw err;
    }
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
// else if (cmd === 'create') {
//   fs.readFile(petsPath, 'utf8', function(readErr, data) {
//     if (readErr) {
//       throw readErr;
//     }
//
//     var pets = JSON.parse(data);
//     var pet = process.argv[3];
//
//     if (!pet) {
//       console.error(`Usage: ${node} ${file} ${cmd} PET`);
//       process.exit(1);
//     }
//
//     guests.push(guest);
//
//     var guestsJSON = JSON.stringify(guests);
//
//     fs.writeFile(guestsPath, guestsJSON, function(writeErr) {
//       if (writeErr) {
//         throw writeErr;
//       }
//
//       console.log(guest);
//     });
//   });
// }
else {
  console.error(`Usage: ${node} ${file} [read | create]`);
  process.exit(1);
}

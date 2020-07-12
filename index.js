#!/usr/bin/env node

const fs = require("fs");
const util = require("util");

//#2 use util.promisify to wrap lstat in promise
//const lstat = util.promisify(fs.lstat);

//#3  fs.promises.lstat
// const lstat = fs.promises.lstat; or
const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) throw new Error(err);
  for (let file of filenames) {
    try {
      const stats = await lstat(file);
      console.log(file, stats.isFile());
    } catch (err) {
      console.log("error : ", err);
    }
  }
});

// #1 : wrap lstat function in promise
// const lstat = (filenames) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filenames, (err, stats) => {
//       if (err) reject(err);

//       resolve(stats);
//     });
//   });
// };

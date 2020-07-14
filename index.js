#!/usr/bin/env node

const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const log = console.log;
const path = require("path");

//#2 use util.promisify to wrap lstat in promise
//const lstat = util.promisify(fs.lstat);

//#3  fs.promises.lstat
// const lstat = fs.promises.lstat; or
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();
console.log(path.dirname(targetDir));
fs.readdir(targetDir, async (err, filenames) => {
  if (err) throw new Error(err);
  const statPromises = filenames.map((file) => {
    return lstat(path.join(targetDir, file));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const idx = allStats.indexOf(stats);
    if (stats.isFile()) log(chalk.blue(filenames[idx]));
    else log(chalk.red.bold(filenames[idx]));
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

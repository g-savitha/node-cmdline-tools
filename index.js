#!/usr/bin/env node

const fs = require("fs");

fs.readdir(process.cwd(), (err, filenames) => {
  if (err) throw new Error(err);

  for (let file of filenames) {
    fs.lstat(file, (err, stats) => {
      if (err) throw new Error(err);

      if (stats.isFile()) console.log("file :", file);
      if (stats.isDirectory()) console.log("directory :", file);
    });
  }
});

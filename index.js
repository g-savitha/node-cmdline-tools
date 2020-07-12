#!/usr/bin/env node

const fs = require("fs");

fs.readdir(process.cwd(), (err, filenames) => {
  if (err) throw new Error(err);
  let allStats = Array(filenames.length).fill(null);

  for (let file of filenames) {
    const idx = filenames.indexOf(file);
    fs.lstat(file, (err, stats) => {
      if (err) throw new Error(err);

      allStats[idx] = stats;
      // returns true when none of the elements in array are null
      const ready = allStats.every((stats) => {
        return stats;
      });

      if (ready) {
        allStats.forEach((stats, idx) => {
          console.log(filenames[idx], stats.isFile());
        });
      }
    });
    console.log();
  }
});

const fs = require("fs");
const path = require("path");
const ncp = require("ncp");
const { mkdir } = require("fs");
const { prompt } = require("inquirer");



function botcreator(){

  const config = {
      name: "discord.js",
      author: "",
      version: "1.0.0"
  };


  function copyDir(src, dest) {
    return new Promise((resolve, reject) => {
      ncp(src, dest, err => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  function createDir(path) {
    return new Promise((resolve, reject) => {
      mkdir(path, err => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  function getPkg(obj) {
    const pkg = require("./package.json");

    for (const [key, val] of Object.entries(obj)) {
      pkg[key] = val;
    }

    return JSON.stringify(pkg, null, 2);
  }

  function writeFile(path, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, err => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  (async () => {
    try {
      const name = await prompt({
        type: "input",
        name: "name",
        message: "What is the name of the project?"
      });

      const author = await prompt({
          type: "input",
          name: "author",
          message: "What is the name of the author?"
      });

      const version = await prompt({
          type: "input",
          name: "version",
          message: "What is the version of the project?"
      });


      Object.assign(config, name);
      Object.assign(config, author);
      Object.assign(config, version);

      const pkg = getPkg(config);

      const dest = path.join(process.cwd(), config.name);

      await Promise.all([createDir(dest), copyDir(path.join(__dirname, "template"), dest)]);

      await writeFile(path.join(dest, "package.json"), pkg);

      console.log(`Done. Created ${name.name}`);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  })();


}


module.exports.botcreator = botcreator;

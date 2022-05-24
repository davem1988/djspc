#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const ncp = require("ncp");
const { mkdir, writeFile } = require("fs");
const { prompt } = require("inquirer");



  

function main(){


  const questions = [
    {
      type: "list",
      name: "choice",
      message: "What do you want to do?",
      choices: [
        {
          name: "Create a new project",
          value: "new"
        },
        {
          name: "Add a command",
          value: "command"
        },
        {
          name: "Add an event",
          value: "event"
        }
      ]
    }
  ]

  function getChoice() {
    return prompt(questions)
      .then(answers => {
        return answers
      })
      .catch(err => {
        console.log(err)
      })
  };

  function createNewProject(){
    prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the project?"
      },
      {
        type: "input",
        name: "author",
        message: "What is the name of the author?"
      },
      {
        type: "input",
        name: "version",
        message: "What is the version of the project?"
      }
      
    ])
      .then(async answers => {
   
        try {
          const name = answers.name
          const author = answers.author
          const version = answers.version
   
          const config = {
            name: name,
            author: author,
            version: version
          };
    
          Object.assign(config, name);
          Object.assign(config, author);
          Object.assign(config, version);
    
          const pkg = getPkg(config);
    
          const dest = path.join(process.cwd(), config.name);
    
          await Promise.all([createDir(dest), copyDir(path.join(__dirname, "template"), dest)]);
    
          await writeFile(path.join(dest, "package.json"), pkg);
    
          console.log(`Done. Created ${name}`);
        } catch (e) {
          console.error(e);
          process.exit(1);
        }

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
          const pkg = require("../package.json");
      
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

        
      })
      .catch(err => {
        console.log(err)
      })
  };

  function addCommand() {
    prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the command?"
      },
      {
        type: "list",
        name: "category",
        message: "What is the category of the command?",
        choices: [
          "music",
          "fun",
          "info",
          "general"
        ]
      }
    ])
      .then(async answers => {
        try {
          const name = answers.name
          const category = answers.category
         
   
          const config = {
            name: name,
            category: category,
          };

          const CMDconfig = {
            template:
              `module.exports = {
                name: '${config.name}',
                async execute(message, args) {
                  message.channel.send('${config.name} Command Works!')
                }
              }`
          }
    
          Object.assign(config, name);
          Object.assign(config, category);
    
          const dest = path.join(process.cwd(), `/commands/${config.category}`);
          function isExists(path){
            const directory = fs.existsSync(path)
            if(directory){
              return true;
            }else{
              return false;
            }
            
          }
          console.log(isExists(dest))

          if(isExists(dest) === false) {
            const newDir = await Promise.all([createDir(dest)]);

            if(newDir){
              const cmd = CMDconfig.template;
              await writeFile(path.join(dest, `${config.name}.js`), cmd);
              console.log(`Done. Created Command: ${name}`);
            }else {
              return;
            }
            


          }else if(isExists(dest) === true){
            const cmd = CMDconfig.template;
          
            await writeFile(path.join(dest, `${config.name}.js`), cmd);
    
            console.log(`Done. Created Command: ${name}`);
          }

          
        } catch (e) {
          console.error(e);
          process.exit(1);
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
      })
      .catch(err => {
        console.log(err)
      })
  }

  function addEvent(){
    prompt([
      {
        type: "list",
        name: "event",
        message: "What Event do you want?",
        choices: [
          "applicationCommandCreate",
          "applicationCommandDelete",
          "applicationCommandUpdate",
          "channelCreate",
          "channelDelete",
          "channelPinsUpdate",
          "channelUpdate",
          "debug",
          "emojiCreate",
          "emojiDelete",
          "emojiUpdate",
          "error",
          "guildBanAdd",
          "guildBanRemove",
          "guildCreate",
          "guildDelete",
          "guildIntegrationsUpdate",
          "guildMemberAdd",
          "guildMemberAvailable",
          'guildMemberRemove',
          'guildMembersChunk',
          'guildMemberUpdate',
          'guildUnavailable',
          'guildUpdate',
          'interaction',
          'interactionCreate',
          'invalidated',
          'invalidRequestWarning',
          'inviteCreate',
          'inviteDelete',
          "message",
          'messageCreate',
          'messageDelete',
          'messageDeleteBulk',
          'messageReactionAdd',
          'messageReactionRemove',
          'messageReactionRemoveAll',
          'messageReactionRemoveEmoji',
          'messageUpdate',
          'presenceUpdate',
          'rateLimit',
          'ready',
          'roleCreate',
          'roleDelete',
          'roleUpdate',
          'shardDisconnect',
          "shardError",
          'shardReady',
          "shardReconnecting",
          'shardResume',
          'stageInstanceCreate',
          'stageInstanceDelete',
          'stageInstanceUpdate',
          'stickerCreate',
          'stickerDelete',
          "stickerUpdate",
          "threadCreate",
          "threadDelete",
          "threadListSync",
          "threadMembersUpdate",
          "threadMemberUpdate",
          "threadUpdate",
          "typingStart",
          'userUpdate',
          "voiceStateUpdate",
          "warn",
          "webhookUpdate",
        ]
      }
    ])
      .then(async answers => {
        try {
          const name = answers.event


          const config2 = {
            name: name,
            category: 'events',
          };

          const EVTconfig = {
            template:
              `module.exports = {
                name: "${config2.name}",
                once: false,
                async execute(client){
                  return;
                }
              }`
          }

          Object.assign(config2, name);

          const cat = config2.category
          const dest = path.join(process.cwd(), cat);
          function isExists(path){
            const directory = fs.existsSync(path)
            if(directory){
              return true;
            }else{
              return false;
            }
            
          }

          if(isExists(dest) === true){

            const evt = EVTconfig.template;

            await writeFile(path.join(dest, `${config2.name}.js`), evt);

            console.log(`Done. Created Event: ${name}`);
            
          }else if(isExists(dest) === false){
            const newDir = await Promise.all([createDir(dest)]);
            const evt = EVTconfig.template;

            await writeFile(path.join(dest, `${config2.name}.js`), evt);

            console.log(`Done. Created Event: ${name}`);
          }


        } catch (e) {
          console.error(e);
          process.exit(1);
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
      })
      .catch(err => {
        console.log(err)
      })
  }



  getChoice().then(answers => {
    switch (answers.choice) {
      case "new":
        createNewProject();
        break;
      case "command":
        addCommand();
        break;
      case "event":
        addEvent();
        break;
      default:
        break;
    }
  })

  // (async () => {
  //   try {
  //     const name = await prompt({
  //       type: "input",
  //       name: "name",
  //       message: "What is the name of the project?"
  //     });

  //     const author = await prompt({
  //         type: "input",
  //         name: "author",
  //         message: "What is the name of the author?"
  //     });

  //     const version = await prompt({
  //         type: "input",
  //         name: "version",
  //         message: "What is the version of the project?"
  //     });


  //     Object.assign(config, name);
  //     Object.assign(config, author);
  //     Object.assign(config, version);

  //     const pkg = getPkg(config);

  //     const dest = path.join(process.cwd(), config.name);

  //     await Promise.all([createDir(dest), copyDir(path.join(__dirname, "template"), dest)]);

  //     await writeFile(path.join(dest, "package.json"), pkg);

  //     console.log(`Done. Created ${name.name}`);
  //   } catch (e) {
  //     console.error(e);
  //     process.exit(1);
  //   }
  // })();


}


main();

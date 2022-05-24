const Discord = require("discord.js");
const client = new Discord.Client({intents: 515});
const fs = require('fs');
const {config} = require('./config.json')

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log("I am ready!");
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(config.Prefix) || message.author.bot) return;
  const args = message.content.slice(config.Prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const cmd = client.commands.get(commandName);
  if(!cmd) return message.channel.send('This command does not exist!');
  cmd.execute(message, args);
 
});

client.login(config.Token);
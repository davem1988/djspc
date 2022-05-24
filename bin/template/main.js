const Discord = require('discord.js');
const client = new Discord.Client({intents: 515});
const fs = require('fs');
const {config} = require('./config.json');
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();
const commandCategory = fs.readdirSync('./commands/').filter(folder => folder);
for (const folder of commandCategory){
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for(const file of commandFiles){
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

for(const file of eventFiles){
	const event = require(`./events/${file}`);
  const eventName = file.split('.')[0];
  client.on(eventName, (...args) => event.execute(client, ...args));
}


client.login(config.Token);
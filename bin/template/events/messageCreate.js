
module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        const { config } = require('../config.json');

        if (!message.content.startsWith(config.Prefix) || message.author.bot) return;

        const args = message.content.slice(config.Prefix.length).split(/ +/);

        const commandName = args.shift().toLowerCase();

        const cmd = client.commands.get(commandName);

        if(!cmd) return message.channel.send('This command does not exist!');

        cmd.execute(message, args);

    }
}
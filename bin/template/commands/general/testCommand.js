module.exports = {
    name: 'test',
    async execute(message, args) {
        message.channel.send('Test Command Works!')
    }
}
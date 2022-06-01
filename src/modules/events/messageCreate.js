const request = require("request");
const { access_token } = require('../config/config.json');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) { return; }

        console.log(`${message.author.tag} in #${message.channel.name} wrote a message.`);

        await request.post({
            url: 'http://localhost:8090/api/message',
            form: {
                author_id: message.author.id,
                author: message.author.username,
                token: access_token,
            }}, (err, res) => {
            if (err) {
                return console.log(err);
            }
            console.log(res.body)
        });
    }
}
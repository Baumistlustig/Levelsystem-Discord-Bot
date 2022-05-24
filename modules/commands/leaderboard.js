const { SlashCommandBuilder } = require("@discordjs/builders");
const request = require("request");
const { MessageEmbed, MessageButton} = require("discord.js");
const paginationEmbed = require("discordjs-button-pagination");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Shows the 5 users with the highest experience'),
    async execute(interaction) {
        await request.get({ url: `http://localhost:8090/api/leaderboard/` },
            async (err, res) => {
                if (err) {
                    return console.log(err);
                }

                let response = JSON.parse(res.body);

                const user1 = new MessageEmbed()
                    .setTitle('**#1** User 🥇')
                    .setDescription('This is the first user in terms of messages')
                    .addField('Username: ', `${response.first.username}`)
                    .addField('Experience: ', `${response.first.experience} Messages`)
                    .setColor("GOLD")
                    .setTimestamp();

                const user2 = new MessageEmbed()
                    .setTitle('**#2** User 🥈')
                    .setDescription('This is the second user in terms of messages')
                    .addField('Username: ', `${response.second.username}`)
                    .addField('Experience: ', `${response.second.experience} Messages`)
                    .setColor('#C0C0C0')
                    .setTimestamp();

                const user3 = new MessageEmbed()
                    .setTitle('**#3** User 🥉')
                    .setDescription('This is the third user in terms of messages')
                    .addField('Username: ', `${response.third.username}`)
                    .addField('Experience: ', `${response.third.experience} Messages`)
                    .setColor("#cd7f32")
                    .setTimestamp();

                const user4 = new MessageEmbed()
                    .setTitle('**#3** User 🥉')
                    .setDescription('This is the third user in terms of messages')
                    .addField('Username: ', `${response.fourth.username}`)
                    .addField('Experience: ', `${response.fourth.experience} Messages`)
                    .setColor("#454FBF")
                    .setTimestamp();

                const user5 = new MessageEmbed()
                    .setTitle('**#3** User 🥉')
                    .setDescription('This is the third user in terms of messages')
                    .addField('Username: ', `${response.fifth.username}`)
                    .addField('Experience: ', `${response.fifth.experience} Messages`)
                    .setColor("#454FBF")
                    .setTimestamp();


                const button1 = new MessageButton()
                    .setCustomId('previousbtn')
                    .setLabel('Previous')
                    .setEmoji('⬅️')
                    .setStyle('DANGER');
                const button2 = new MessageButton()
                    .setCustomId('nextbtn')
                    .setLabel('Next')
                    .setEmoji('➡️')
                    .setStyle('SUCCESS');

                // Create an array of embeds
                const pages = [
                    user1,
                    user2,
                    user3,
                    user4,
                    user5,
                ];

                const buttonList = [
                    button1,
                    button2
                ];

                const timeout = 100000;

                await paginationEmbed(interaction, pages, buttonList, timeout);
            }
        )
    }
}
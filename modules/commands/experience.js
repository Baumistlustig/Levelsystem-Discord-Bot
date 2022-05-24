const { SlashCommandBuilder } = require("@discordjs/builders");
const request = require('request');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('experience')
        .setDescription('Shows the experience of a user'),
    async execute(interaction) {
        await request.get({
            url: `http://localhost:8090/api/user/`,
            form: {
                author_id: interaction.user.id,
                author: interaction.user.username,
            }},
        async (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            const embed = new MessageEmbed()
                .setTitle('Your Experience Points')
                .setDescription(`Your XP is currently ${body}`)
                .addField('Tip:', 'Write more messages to earn more XP')
                .setColor('BLURPLE')
                .setTimestamp();
            await interaction.reply({embeds: [embed]});
        });
    }
}
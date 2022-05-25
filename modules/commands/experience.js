const { SlashCommandBuilder } = require("@discordjs/builders");
const request = require('request');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('experience')
        .setDescription('Shows the experience of a user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user whose level you want')
                .setRequired(false)
        ),
    async execute(interaction) {
        let user = interaction.options.getUser('user');
        if (!user) {
            user = {
                id: undefined,
                username: undefined,
            }
        }

        await request.get({
            url: `http://localhost:8090/api/user/`,
            form: {
                author_id: interaction.user.id,
                author_username: interaction.user.username,
                target_id: user.id,
                target_name: user.username,
            }},
        async (err, res, body) => {
            if (err) {
                return console.log(err);
            }

            body = JSON.parse(body)

            const embed = new MessageEmbed()
                .setTitle('Your Experience Points')
                .setDescription(`Your XP is currently ${body.experience}`)
                .addField('Tip:', 'Write more messages to earn more XP')
                .setColor('BLURPLE')
                .setTimestamp();
            await interaction.reply({embeds: [embed]});
        });
    }
}
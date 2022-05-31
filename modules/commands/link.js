const { SlashCommandBuilder } = require("@discordjs/builders");
const request = require("request");
const { access_token } = require('../config/config.json');
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Used to link your discord account to other accounts')
        .addStringOption(option =>
            option
                .setName('platform')
                .setDescription('The platform you want to link your account to')
                .setRequired(true)
        )
        .addStringOption(option =>
        option.setName('username')
            .setDescription('The username of the platform you want to link')
            .setRequired(true)
        ),
    async execute(interaction) {
        const platform = interaction.options.getString('platform');
        const username = interaction.options.getString('username');

        request.post({
            url: 'http://localhost:8090/api/link',
            form: {
                author_id: interaction.user.id,
                author: interaction.user.username,
                token: access_token,
                platform: platform,
                minecraft: username,
            }
        }, async (err, res, body) => {
            let embed;
            if (err) {
                console.log(err);
                embed = new MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('At transmitting the data something bad happened!')
                    .addField('Error:', `${err}`)
                    .setColor('RED')
            } else {
                embed = new MessageEmbed()
                    .setTitle('Linked!')
                    .setDescription(`You successfully linked your account`)
                    .addField('Minecraft:', `${username}`)
                    .setColor('#5865f2')
                    .setTimestamp();
            }

            await interaction.reply({embeds: [embed]});
        });
    }
}
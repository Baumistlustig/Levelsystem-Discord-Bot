const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Client, Intents} = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows the latency of the bot'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setTitle('🏓Pong!')
            .addField('Bot Latency:', `${Math.round(client.ws.ping)}ms`)
            .addField('Your Ping:', `${new Date().getTime() - interaction.createdTimestamp}ms`)
            .setColor('GREEN')
            .setTimestamp();

        await interaction.reply({embeds: [embed]});
    },
};
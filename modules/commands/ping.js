import { MessageEmbed } from "discord.js";

export async function ping(interaction) {
    const embed = new MessageEmbed()
        .setTitle('🏓Pong!')
        .addField('Bot Latency:', `${Math.round(client.ws.ping)}ms`)
        .addField('Your Ping:', `${new Date().getTime() - interaction.createdTimestamp}ms`)
        .setColor('GREEN')
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
}
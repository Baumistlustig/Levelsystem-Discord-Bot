import request from "request";
import { callback, getOptions } from "../service/http.service.js";
import { MessageEmbed } from "discord.js";

export async function link(interaction) {
    let minecraft_username = 'Baumistlustig' //TODO: Add argument
    request.get(getOptions(
        `http://localhost:8090/api/link`,
        {
            author_id: interaction.user.id,
            author: interaction.user.username,
            token: `${process.env.ACCESS_TOKEN}`
        }
    ), async (err, res, body) => {
        callback(err);
        const embed = new MessageEmbed()
            .setTitle('Linked!')
            .setDescription(`You successfully linked your account ${body}`)
            .addField('Minecraft:', `${minecraft_username}`)
            .setColor('BLURPLE')
            .setTimestamp();
        await interaction.reply({embeds: [embed]});
    });
}
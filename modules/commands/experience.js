import request from "request";
import {callback, getOptions} from "../service/http.service.js";
import {MessageEmbed} from "discord.js";

export async function experience(interaction) {
    request.get(getOptions(
        `http://localhost:8090/api/user/`,
        {
            author: interaction.user.id,
        }
    ), async (err, res, body) => {
        callback(err);
        const embed = new MessageEmbed()
            .setTitle('Your Experience Points')
            .setDescription(`Your XP is currently ${body}`)
            .addField('Tip:', 'Write more messages to earn more XP')
            .setColor('BLURPLE')
            .setTimestamp();
        await interaction.reply({embeds: [embed]});
    });
}
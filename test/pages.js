// Import MessageEmbed from discord.js
import { MessageEmbed } from "discord.js";
// Import the discord-pages package
import DiscordPages from "discord-pages";
const embed1 = new MessageEmbed()

// Create an array of embeds
const pages = [
    embed1,
    embed2,
    ect,
];

// Create a new embed page
// Pages param is an array of embeds
// Channel param is the TextChannel that you want to send the embed pages
const embedPages = new DiscordPages({
    pages: pages,
    channel: channel,
});
embedPages.createPages();
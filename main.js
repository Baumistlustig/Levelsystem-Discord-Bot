import DiscordJS, { Intents } from 'discord.js';
import * as http from "http";
import dotenv from 'dotenv';

dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],
});

const http_options = {
    port: 8090,
    host: '0.0.0.0',
    path: '/api/user/baumistlustig'
};

let callback;
let res;

callback = function(response) {
    let str = '';

    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        console.log(res);
    });
    res = str;
    return str;
}

client.on('ready', () => {
    const guildId ='778867901880860692';
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'replies with pong',
    });
});

client.on('interactionCreate', async (interaction) => {

    if (!interaction.isCommand()) {
        return;
    }

    const { commandName, options } = interaction;

    if (commandName === 'ping') {

        http.request(http_options, callback).end();
        interaction.reply(`${process.env.RES}`)
    }
});



client.login(process.env.TOKEN).then(
    r => console.log(`Bot logged in as ${client.user.tag}`
    )
);

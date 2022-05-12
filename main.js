import DiscordJS, { Intents } from 'discord.js';
import request from 'request'
import dotenv from 'dotenv';

dotenv.config()

// Modules
import { getOptions, callback } from "./modules/service/http.service.js";

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],
});


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


    }
});

let counter = 0;

client.on('messageCreate', async (message) => {

    if (message.author.bot) { return; }

    console.log(message.author)

    request.post(getOptions(
        'http://localhost:8090/api/message',
        {
            author: message.author.username,
        }
    ), (err, res, body) => {
        callback(err, res, body);

        console.log(JSON.parse(body));
    });
});

client.login(process.env.TOKEN).then(
    r => console.log(`Bot logged in as ${client.user.tag}`
    )
);

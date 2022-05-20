import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config()

// Modules
import { link} from "./modules/commands/link.js";
import { experience} from "./modules/commands/experience.js";
import { messageCreate} from "./modules/events/messageCreate.js";
import { ping} from "./modules/commands/ping.js";
import {ready} from "./modules/events/ready.js";

export const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],
});


client.on('ready', async () => {
    await ready()
});

client.on('interactionCreate', async (interaction) => {

    if (!interaction.isCommand()) {
        return;
    }

    const { commandName, options } = interaction;

    if (commandName === 'ping') {
        await ping(interaction);
    }

    if (commandName === 'experience') {
        await experience(interaction);
    }

    if (commandName === 'link') {
        await link(interaction);
    }
});


client.on('messageCreate', async (message) => {
    await messageCreate(message);
});

client.login(process.env.TOKEN).then(
    r => console.log(`Bot logged in as ${client.user.tag}`
    )
);

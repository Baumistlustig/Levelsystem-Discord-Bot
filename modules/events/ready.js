import { client } from "../../main.js";

export async function ready() {
    const guildId ='778867901880860692';
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application?.commands
    }

    commands?.create([
        {
            name: 'experience',
            description: 'Shows your own experience',
            options: [
                {
                    name: 'user',
                    description: ' The user to get the level from',
                    type: 6,
                    required: false
                }
            ]
        },
        {
            name: 'ping',
            description: 'Shows the latency of the bot'
        },
        {
            name: 'link',
            description: 'Links your Discord Account to a specific Minecraft Account.',
            options: [
                {
                    name: 'minecraft_user',
                    description: 'The account to link',
                    required: true,
                }
            ]
        }
        ]
    );
}
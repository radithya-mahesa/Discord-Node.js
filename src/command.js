require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with the bot ping' 
    },
    {
        name: 'about',
        description: 'About me!',
    },
    {
        name: 'review_kelamin',
        description: ':3',
    },
    {
        name: 'nanya',
        description: 'Nanya apa?',
        options: [
            {
                name: 'question',
                type: 3, 
                description: 'Pertanyaan lu',
                required: true,
            },
        ],
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Registering global slash commands...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('Global slash commands were registered successfully!');
    } catch (error) {
        console.error(`Jebret Error: ${error}`);
    }
})();
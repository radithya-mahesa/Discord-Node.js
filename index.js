require('dotenv').config();
const { version } = require('discord.js');
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, ComponentType } = require("discord.js");
const http = require('http');
const path = require('path');
const alive = require('./alive')
alive()

const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is Alive!`);
});

client.login(process.env.BOT_TOKEN);

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) {
        return;
    }

    if (msg.content.includes('@everyone') || msg.content.includes('@here')) {
        return;
    }

    const messageContent = msg.content.toLowerCase();

})

client.on('interactionCreate', async (interact) => {
    if (!interact.isChatInputCommand()) return;

    if (interact.commandName === 'about') {
        const botName = client.user.id;
        const creatorId = '548439065733890048';
        const Admin = `<@${creatorId}>`;

        interact.reply(`**Nama Bot:** <@${botName}>\n**Wujud Atmin:** ${Admin}\n**discord.js Version:** v${version}\n**Latency:** \`${Date.now() - interact.createdTimestamp}ms\``);
    }

    if (interact.commandName === 'ping') {
        interact.reply(`🏓**Pong!**\n Latency is: \`${Date.now() - interact.createdTimestamp}ms\`\n API Latency is: \`${Math.round(client.ws.ping)}ms\``);
    }

    if (interact.commandName === 'review_kelamin') {
        const botName = client.user.id;
        const user = interact.user;
        const size = Math.floor(Math.random() * 10) + 1;
        const review = `8${'='.repeat(size)}D`;
        const imgBukti = path.resolve(__dirname, 'src/img/image.jpg');

        interact.reply({
            content: `${user.username}: "Mana buktinya?"\n<@${botName}>:\n"Ini buktinya 👉 ${review}"`,
            files: [imgBukti]
        });
    }

    if (interact.commandName === 'nanya') {
        const question = interact.options.getString('question');
        const choice = ["Pasti iya.", "Bener banget.", "Tanpa ragu, Iya!", "Ya, pasti lah.", "Iyain aja gak sih 😹", "Menurut gue, iya.", "Kemungkinan besar.", "Kelihatannya bagus.", "Iya.", "Tanda-tandanya sih iya.", "Malas menggapi 🧢", "Peduli ap gwe 😹", "Kurang Tahu", "Iya njir, haha", "Tanya lagi.", "Jangan ngarep deh.", "Jawaban gw enggak.", "Kata radit enggak.", "Kayaknya enggak.", "Sangat diragukan."];
        const ball = Math.floor(Math.random() * choice.length);

        const embed1 = new EmbedBuilder()
            .setColor('Purple')
            .setTitle(`${interact.user.username}'s Balls`)
            .addFields({ name: 'Pertanyaan', value: `${question}`, inline: true });

        const embed2 = new EmbedBuilder()
            .setColor('Purple')
            .setTitle(`${interact.user.username}'s Balls`)
            .addFields({ name: 'Pertanyaan lu', value: `${question}`, inline: true })
            .addFields({ name: 'Jawabanku', value: `${choice[ball]}`, inline: true });

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('button')
                    .setLabel('Cek Jawaban')
                    .setStyle(ButtonStyle.Primary)
            );

        const msg = await interact.reply({
            embeds: [embed1],
            components: [button]
        });

        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button });

        collector.on('collect', async i => {
            if (i.customId === 'button') {
                await i.update({
                    embeds: [embed2],
                    components: []
                });
            }
        });
    }
});

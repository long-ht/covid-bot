const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const covidTracking = require('./covidTracking');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
    if (msg.content === '#dlcovid') {
        const message = await covidTracking.summary();
        msg.reply(message);
    } else if (msg.content === "#help") {
        msg.reply(covidTracking.help());
    } else if (msg.content.startsWith("#dl ")) {
        const message = await covidTracking.country(msg.content);
        msg.reply(message);
    }
});

client.login(token);
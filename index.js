// ENVIROMENT
require('dotenv').config();
// REQUIRES
const Discord = require("discord.js-light");
const client = new Discord.Client({
    cacheGuilds: true,
    cacheChannels: false,
    cacheOverwrites: false,
    cacheRoles: false,
    cacheEmojis: false,
    cachePresences: false
});
//MODULES
const {nutri} = require('./components/nutri.js');
const config = require('./config.json');
//CODE
client.on('ready', () => {
    console.log(`${client.user.username} is ready`);
    client.user.setActivity(`prefix: ${config.prefix}`, {
        type: "WATCHING"
    });
});
client.on('message', (message) => {
    if(message.author.bot) return;
    let args = message.content.split(' '); 
    if(args[0] == config.prefix) {
        args.shift();
        if(args[0] === 'help') {
            message.reply('Join our discord server for more help!\nhttps://discord.gg/cETUT5Pt5k')
        } else {
            let searchValues = args.join(' ')
            nutri(client, message, searchValues);
        }
    } else {
        return;
    }
});
//LOGIN
client.login(process.env.TOKEN).catch(console.error);
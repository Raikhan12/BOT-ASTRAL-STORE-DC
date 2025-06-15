const { Client, Collection, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const config = require("./config");
const chalk = require("chalk");
const greeting = require("./database/greeting");

const client = new Client({
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

client.on("guildMemberAdd", async (member) => {
    await greeting.findOne({ GuildID: member.guild.id }).then(async (data) => {
        if (!data) return;
        if (data) {
            await client.channels.cache.get(data.ChannelID).send({
                embeds: [new EmbedBuilder()
                    .setTitle(`${member.guild.name}`)
                    .setDescription(`<:0:1217088527641088101><:1:1217088530208129024><:2:1217088533974745221><:3:1217088536826871968><:4:1217088539695644763><:5:1217088525447467128> \n Selamat datang ${member.user} di toko kami! \n >>> Jika ada waktu silahkan baca <#1198292799691440219>
                    dan jika mau order , langsung aja ke <#1216967458858991637> `)
                    .setImage(`https://telegra.ph/file/b1d318339e4558a7204a6.gif`)
                    .setTimestamp()
                    .setFooter({ text: 'AstralStore'})
                    .setColor(config.embed.color)]
            });
        }
    });
});

client.on('guildMemberRemove', async (member) => {
    await greeting.findOne({ GuildID: member.guild.id }).then(async (data) => {
        if (!data) return;
        if (data) {
            await client.channels.cache.get(data.ChannelID).send({
                embeds: [new EmbedBuilder()
                    .setTitle(`${member.guild.name}`)
                    .setDescription(`Selamat tinggal ${member.user}`)
                    .setImage(`https://telegra.ph/file/3b1d54e09a1d07ddf85c8.gif`)
                    .setTimestamp()
                    .setFooter({ text: 'AstralStore'})
                    .setColor(config.embed.color)]
            });
        }
    });
});

client.handleEvents();
client.handleCommands();
client.login(config.client.token);


client.on("error", (err) => {
    console.log(chalk.white(chalk.bold('SYSTEM')), chalk.red('+'), chalk.redBright(`${err}`))
})

process.on("unhandledRejection", (reason, promise) => {
    console.log(chalk.white(chalk.bold('SYSTEM')), chalk.red('+'), chalk.redBright(`${reason}`))
    console.log(chalk.white(chalk.bold('SYSTEM')), chalk.red('+'), chalk.redBright(`${promise}`))
})

process.on("uncaughtException", (err, origin) => {
    console.log(chalk.white(chalk.bold('SYSTEM')), chalk.red('+'), chalk.redBright(`${err}`))
    console.log(chalk.white(chalk.bold('SYSTEM')), chalk.red('+'), chalk.redBright(`${origin}`))
})

process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(chalk.white(chalk.bold('SYSTEM')), chalk.red('+'), chalk.redBright(`${err}`))
    console.log(chalk.white(chalk.bold('SYSTEM')), chalk.red('+'), chalk.redBright(`${origin}`))
})

process.on("warning", (warn) => {
    console.log(chalk.white(chalk.bold('SYSTEM')), chalk.red('+'), chalk.redBright(`${warn}`))
})
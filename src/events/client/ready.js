const chalk = require("chalk");
const { ActivityType } = require("discord.js");
const config = require("../../config");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(chalk.white(chalk.bold('SYSTEM')), chalk.red('+'), chalk.cyan(`Successfully logged to ${client.user.username}`))

        setInterval(async function () {
            const guild = await client.guilds.fetch(config.member.guild)
            const status = [`${guild.memberCount} user in ${guild.name}`];
            const statuses = status[Math.floor(Math.random() * status.length)]
            client.user.setActivity(statuses, { type: ActivityType.Watching })
            client.user.setPresence({ status: 'dnd' })
        }, 10000)
    }
}
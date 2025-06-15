const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the latest latency from the bot')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

    async execute(interaction, client) {

        const ping = Math.floor(Date.now() - interaction.createdAt);
        const pingSeconds = ((ping % 60000) / 1000);
        const apiSeconds = ((client.ws.ping % 60000) / 1000);

        interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle(`${client.user.username}'s Latency`)
                .setColor(config.embed.color)
                .setDescription(`**Client Latency :** ${ping}ms (${pingSeconds}s)\n**Api Latency :** ${client.ws.ping}ms (${apiSeconds}s)`)], ephemeral: true
        })
    }
}
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const payment = require('../../database/payment');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('payment')
        .setDescription('Displays payment methods for this server!')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction, client) {
        await payment.findOne({ GuildID: interaction.guild.id }).then(async (data) => {
            if (data) {
                const Embed = new EmbedBuilder()
                    .setTitle(`${interaction.guild.name}'s Payment Method`)
                    .setColor(config.embed.color)

                if (data.Qris) {
                    Embed.setImage(data.Qris)
                }

                if (data.Dana) {
                    Embed.addFields([
                        { name: 'DANA', value: `\`\`\`${data.Dana}\`\`\``, inline: false },
                    ])
                }

                if (data.Gopay) {
                    Embed.addFields([
                        { name: 'GOPAY', value: `\`\`\`${data.Gopay}\`\`\``, inline: false },
                    ])
                }

                if (data.Ovo) {
                    Embed.addFields([
                        { name: 'OVO', value: `\`\`\`${data.Ovo}\`\`\``, inline: false },
                    ])
                }

                interaction.reply({ embeds: [Embed] })
            } else {
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`Payment has not been added for this server.`)
                        .setColor(config.embed.color)], ephemeral: true
                })
            }
        })
    }
}

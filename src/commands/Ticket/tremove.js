const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const ticket = require("../../database/ticket");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tremove')
        .setDescription('Remove someone from the current ticket channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addUserOption((option) => option
            .setName('target').setDescription('Someone who wants to be removed from the channel ticket.').setRequired(true)),

    async execute(interaction, client) {
        const { guild, options } = interaction;
        const ticketdata = await ticket.findOne({ GuildID: guild.id });
        const target = options.getMember('target');
        if (interaction.member.roles.cache.has(`${ticketdata.SupportID}`)) {
            if (ticketdata) {
                if (interaction.channel.parentId === `${ticketdata.CategoryID}`) {
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            // .setTitle(``)
                            .setDescription(`Successfully removed ${target} from channel ticket.`)
                            .setColor(config.embed.color)], ephemeral: true
                    }).then(async () => {
                        await interaction.channel.edit({
                            permissionOverwrites: [
                                {
                                    id: guild.id, deny: [
                                        PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: target.id,
                                    deny: [
                                        PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel,
                                        PermissionFlagsBits.AttachFiles, PermissionFlagsBits.AddReactions,
                                        PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.UseApplicationCommands
                                    ]
                                },
                                {
                                    id: interaction.channel.topic,
                                    allow: [
                                        PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel,
                                        PermissionFlagsBits.AttachFiles, PermissionFlagsBits.AddReactions,
                                        PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.UseApplicationCommands
                                    ]
                                },
                                {
                                    id: ticketdata.SupportID,
                                    allow: [
                                        PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ManageChannels,
                                        PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel,
                                        PermissionFlagsBits.UseApplicationCommands, PermissionFlagsBits.AttachFiles,
                                        PermissionFlagsBits.AddReactions, PermissionFlagsBits.ManageRoles
                                    ]
                                }
                            ]
                        });
                    });
                } else {
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            // .setTitle(``)
                            .setDescription(`Failed to execute command because this channel is not a ticket channel.`)
                            .setColor(config.embed.color)], ephemeral: true
                    });
                }
            } else {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        // .setTitle(``)
                        .setDescription(`Failed to execute command because there is no ticket data on this server.`)
                        .setColor(config.embed.color)], ephemeral: true
                });
            }
        } else {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    // .setTitle(``)
                    .setDescription(`You do not have the authority to run this command.`)
                    .setColor(config.embed.color)], ephemeral: true
            });
        }
    }
}
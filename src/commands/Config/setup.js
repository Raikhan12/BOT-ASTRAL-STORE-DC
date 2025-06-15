const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const payment = require('../../database/payment');
const feedback = require('../../database/feedback');
const testimoni = require('../../database/testimonial');
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Setup server store requirements on this server!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        .addSubcommand((command) => command
            .setName('payment').setDescription('Setup payment for this server!')
            .addStringOption((option) => option
                .setName('dana').setDescription('Dana number to be displayed.').setRequired(false))
            .addStringOption((option) => option
                .setName('gopay').setDescription('Gopay number to be displayed.').setRequired(false))
            .addStringOption((option) => option
                .setName('ovo').setDescription('Ovo number to be displayed.').setRequired(false))
            .addStringOption((option) => option
                .setName('qris').setDescription('The qris url to be displayed.').setRequired(false)))

        .addSubcommand((command) => command
            .setName('feedback').setDescription('Setup feedback for this server!')
            .addChannelOption((channel) => channel
                .setName('channel').setDescription('The channel to send the embed.').setRequired(true)))

        .addSubcommand((command) => command
            .setName('testimoni').setDescription('Setup testimonials for this server!')
            .addChannelOption((channel) => channel
                .setName('channel').setDescription('The channel to send the embed.').setRequired(true))
            .addRoleOption((option) => option
                .setName('customer-role').setDescription('Role for when the buyer does not yet have a customer role.').setRequired(true)))

        .addSubcommand((command) => command
            .setName('remove').setDescription('Removed some of the setups installed on this server!')
            .addStringOption((option) => option
                .setName('config').setDescription('List of deleteable setups.').setRequired(true)
                .addChoices(
                    { name: 'Payment', value: 'stpay' },
                    { name: 'Feedback', value: 'stfeed' },
                    { name: 'Testimoni', value: 'sttesti' },
                ))),

    async execute(interaction, client) {
        const { guild, options } = interaction;

        switch (options.getSubcommand()) {
            case 'payment': {
                await payment.findOne({ GuildID: guild.id }).then(async (data) => {
                    if (!data) {
                        await payment.create({
                            GuildID: guild.id,
                            Dana: options.getString('dana') || `Not available.`,
                            Gopay: options.getString('gopay') || `Not available.`,
                            Ovo: options.getString('ovo') || `Not available.`,
                            Qris: options.getString('qris') || `Not available.`,
                        }).then(async () => {
                            interaction.reply({
                                embeds: [new EmbedBuilder()
                                    .setDescription(`Successfully added data from this server.`)
                                    .setColor(config.embed.color)], ephemeral: true
                            })
                        })
                    } else {
                        interaction.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`There is already data on this server.`)
                                .setColor(config.embed.color)], ephemeral: true
                        })
                    }
                })
            }
                break;
            case 'feedback': {
                await feedback.findOne({ GuildID: guild.id }).then(async (data) => {
                    if (!data) {
                        await feedback.create({
                            GuildID: guild.id,
                            ChannelID: options.getChannel('channel').id
                        }).then(async () => {
                            interaction.reply({
                                embeds: [new EmbedBuilder()
                                    .setDescription(`Successfully added data from this server.`)
                                    .setColor(config.embed.color)], ephemeral: true
                            })
                        })
                    } else {
                        interaction.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`There is already data on this server.`)
                                .setColor(config.embed.color)], ephemeral: true
                        })
                    }
                })
            }
                break;
            case 'testimoni': {
                await testimoni.findOne({ GuildID: guild.id }).then(async (data) => {
                    if (!data) {
                        await testimoni.create({
                            GuildID: guild.id,
                            ChannelID: options.getChannel('channel').id,
                            RoleID: options.getRole('customer-role').id
                        }).then(async () => {
                            interaction.reply({
                                embeds: [new EmbedBuilder()
                                    .setDescription(`Successfully added data from this server.`)
                                    .setColor(config.embed.color)], ephemeral: true
                            })
                        })
                    } else {
                        interaction.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`There is already data on this server.`)
                                .setColor(config.embed.color)], ephemeral: true
                        })
                    }
                })
            }
                break;
            case 'remove': {
                switch (options.getString('config')) {
                    case 'stpay': {
                        await payment.findOneAndDelete({ GuildID: guild.id }).then(async (data) => {
                            if (data) {
                                interaction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`Successfully deleted data on this server.`)
                                        .setColor(config.embed.color)], ephemeral: true
                                })
                            } else {
                                interaction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`There is no data on this server.`)
                                        .setColor(config.embed.color)], ephemeral: true
                                })
                            }
                        })
                    }
                        break;
                    case 'stfeed': {
                        await feedback.findOneAndDelete({ GuildID: guild.id }).then(async (data) => {
                            if (data) {
                                interaction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`Successfully deleted data on this server.`)
                                        .setColor(config.embed.color)], ephemeral: true
                                })
                            } else {
                                interaction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`There is no data on this server.`)
                                        .setColor(config.embed.color)], ephemeral: true
                                })
                            }
                        })
                    }
                        break;
                    case 'sttesti': {
                        await testimoni.findOneAndDelete({ GuildID: guild.id }).then(async (data) => {
                            if (data) {
                                interaction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`Successfully deleted data on this server.`)
                                        .setColor(config.embed.color)], ephemeral: true
                                })
                            } else {
                                interaction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`There is no data on this server.`)
                                        .setColor(config.embed.color)], ephemeral: true
                                })
                            }
                        })
                    }
                        break;
                }
            }
                break;
        }
    }
}
const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ticket = require("../../database/ticket");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Manage the installation of the ticket feature on this server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addSubcommand((command) => command
            .setName('enable').setDescription('Enables the ticket feature for this server.')
            .addChannelOption((channel) => channel
                .setName('panel').setDescription('The channel where panel ticket messages are sent.').setRequired(true).addChannelTypes(ChannelType.GuildText))
            .addChannelOption((channel) => channel
                .setName('transcript').setDescription('The channel where the ticket transcript was sent.').setRequired(true).addChannelTypes(ChannelType.GuildText))
            .addChannelOption((channel) => channel
                .setName('log').setDescription('The channel where the ticket log was sent.').setRequired(true).addChannelTypes(ChannelType.GuildText))
            .addChannelOption((channel) => channel
                .setName('category').setDescription('The category in which the ticket was opened and created.').setRequired(true).addChannelTypes(ChannelType.GuildCategory))
            .addRoleOption((option) => option
                .setName('suppport').setDescription('Role to help users in ticketing.').setRequired(true)))
        .addSubcommand((command) => command
            .setName('disable').setDescription('Disables the ticket feature for this server.')),

    async execute(interaction, client) {
        const { guild, options } = interaction;
        switch (options.getSubcommand()) {
            case 'enable': {
                await ticket.findOne({ GuildID: guild.id }).then(async (data) => {
                    if (!data) {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Successfully added feature data to the database for this server.`)
                                .setColor(config.embed.color)], ephemeral: true
                        }).then(async () => {
                            await ticket.create({
                                GuildID: guild.id, ChannelID: options.getChannel('panel').id,
                                TranscriptID: options.getChannel('transcript').id, LogID: options.getChannel('log').id,
                                CategoryID: options.getChannel('category').id, SupportID: options.getRole('suppport').id
                            });

                            const channel = options.getChannel('panel');
                            if (channel) {
                                return channel.send({
                                    embeds: [new EmbedBuilder()
                                        .setTitle(`${interaction.guild.name} Ticket`)
                                        .setDescription(`<:0:1217088527641088101><:1:1217088530208129024><:2:1217088533974745221><:3:1217088536826871968><:4:1217088539695644763><:5:1217088525447467128> \n\n Berikut adalah sistem tiket kami yang digunakan untuk meminta bantuan, mengklaim hadiah, dan sebagainya. Bisa kalian manfaatkan untuk hal tersebut, jika kalian membuka tiket iseng kalian akan kena sanksi dari petugas yang bertanggung jawab.\n\n**NOTE :** Anda hanya mempunyai 1 kuota tiket. Jika ingin membuat tiket lain, silakan tutup tiket sebelumnya.`)
                                        .setColor(config.embed.color)
                                        .setImage(config.embed.image)],
                                    components: [new ActionRowBuilder()
                                        .addComponents(
                                            new ButtonBuilder()
                                                .setLabel('Create Ticket')
                                                .setCustomId('create-ticket')
                                                .setStyle(ButtonStyle.Secondary)
                                        )]
                                });
                            }
                        });
                    } else {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Failed to create feature data because this server has this feature installed.`)
                                .setColor(config.embed.color)], ephemeral: true
                        });
                    }
                });
            }
                break;
            case 'disable': {
                await ticket.findOneAndDelete({ GuildID: guild.id }).then(async (data) => {
                    if (data) {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Successfully deleted feature data on this server.`)
                                .setColor(config.embed.color)], ephemeral: true
                        });
                    } else {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Failed to delete feature data because this server does not have this feature installed.`)
                                .setColor(config.embed.color)], ephemeral: true
                        });
                    }
                });
            }
                break;
        }
    }
}

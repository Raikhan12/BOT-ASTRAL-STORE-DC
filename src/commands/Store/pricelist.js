const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pricelist')
        .setDescription('Sending available pricelist embeds.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption((option) => option
            .setName('product').setDescription('List of products to be sent.').setRequired(true)
            .addChoices(
                { name: 'Product Qris', value: 'a' },
                { name: 'Product Setup bot', value: 'b' },
                { name: 'Product Build bot', value: 'c' },
                { name: 'Product Diamond Mobile Legends', value: 'd' },
            ))
        .addChannelOption((channel) => channel
            .setName('channel').setDescription('The channel where the message was sent.').setRequired(false).addChannelTypes(ChannelType.GuildText)),

    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const Embed = new EmbedBuilder()
            // .setTitle(``)
            .setDescription(`Dibawah ini adalah daftar list produk yang tersedia.`)
            .setColor(config.embed.color)
            // .setImage(``)

        switch (interaction.options.getString('product')) {
            case 'a': {
                Embed.addFields([
                    { name: 'DAFTAR PRODUK', value: `Create Qris`, inline: false }
                ])

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Create Qris')
                            .setCustomId('prod1-a')
                            .setStyle(ButtonStyle.Secondary)
                    )

                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        // .setTitle(``)
                        .setDescription(`Berhasil mengirim daftar harga produk ke ${channel}`)
                        .setColor(config.embed.color)], ephemeral: true
                }).then(async () => {
                    await channel.messages.fetch().then(async (messages) => {
                        if (messages.size > 0) {
                            await channel.bulkDelete(1).then(async () => {
                                return channel.send({ embeds: [Embed], components: [row] });
                            })
                        } else {
                            return channel.send({ embeds: [Embed], components: [row] });
                        }
                    });
                });
            }
                break;
                case 'b': {
                    Embed.addFields([
                        { name: 'DAFTAR PRODUK', value: `Setup Bot`, inline: false }
                    ])
    
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('Setup Bot')
                                .setCustomId('prod1-b')
                                .setStyle(ButtonStyle.Secondary)
                        )
    
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            // .setTitle(``)
                            .setDescription(`Berhasil mengirim daftar harga produk ke ${channel}`)
                            .setColor(config.embed.color)], ephemeral: true
                    }).then(async () => {
                        await channel.messages.fetch().then(async (messages) => {
                            if (messages.size > 0) {
                                await channel.bulkDelete(1).then(async () => {
                                    return channel.send({ embeds: [Embed], components: [row] });
                                })
                            } else {
                                return channel.send({ embeds: [Embed], components: [row] });
                            }
                        });
                    });
                }
                    break;
                    case 'c': {
                        Embed.addFields([
                            { name: 'DAFTAR PRODUK', value: `Build Bot`, inline: false }
                        ])
        
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('Build Bot')
                                    .setCustomId('prod1-c')
                                    .setStyle(ButtonStyle.Secondary)
                            )
        
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Berhasil mengirim daftar harga produk ke ${channel}`)
                                .setColor(config.embed.color)], ephemeral: true
                        }).then(async () => {
                            await channel.messages.fetch().then(async (messages) => {
                                if (messages.size > 0) {
                                    await channel.bulkDelete(1).then(async () => {
                                        return channel.send({ embeds: [Embed], components: [row] });
                                    })
                                } else {
                                    return channel.send({ embeds: [Embed], components: [row] });
                                }
                            });
                        });
                    }
                        break;

            case 'd': {
                Embed.addFields([
                    { name: 'DAFTAR PRODUK', value: `Diamond Mobile Legends`, inline: false }
                ])

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('💎 Diamond Kecil')
                            .setCustomId('prod1-d')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('💎 Diamond Besar')
                            .setCustomId('prod2-e')
                            .setStyle(ButtonStyle.Secondary)
                    )

                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        // .setTitle(``)
                        .setDescription(`Berhasil mengirim daftar harga produk ke ${channel}`)
                        .setColor(config.embed.color)], ephemeral: true
                }).then(async () => {
                    await channel.messages.fetch().then(async (messages) => {
                        if (messages.size > 0) {
                            await channel.bulkDelete(1).then(async () => {
                                return channel.send({ embeds: [Embed], components: [row] });
                            })
                        } else {
                            return channel.send({ embeds: [Embed], components: [row] });
                        }
                    });
                });
            }
                break;
        }
    }
}
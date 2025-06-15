const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listpay')
        .setDescription('Sending available list payment.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption((option) => option
            .setName('listpayment').setDescription('List of payment to be sent.').setRequired(true)
            .addChoices(
                { name: 'List Payment', value: 'd' },
                { name: 'List', value: 'b' },
            ))
        .addChannelOption((channel) => channel
            .setName('channel').setDescription('The channel where the message was sent.').setRequired(false).addChannelTypes(ChannelType.GuildText)),

    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const Embed = new EmbedBuilder()
            .setTitle(`List Payment Astral Store`)
            .setDescription(`<:1020purplearrow:1252530247883292682> Ewallet \n<:1020purplearrow:1252530247883292682> Qris **_(Slow Refund 2x24 jam)_** \n<:1020purplearrow:1252530247883292682> Pulsa **_(Tidak Bisa di Refund)_** \n\nNote\n- Wajib Send Bukti Payment didalam Ticket \n\n**Silahkan di click aja dibawah ini untuk payment tujuan masing-masing**`)
            .setColor(config.embed.color)
            // .setImage(``)

        switch (interaction.options.getString('listpayment')) {
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
                        .setDescription(`Berhasil mengirim daftar payment produk ke ${channel}`)
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
               
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('💸 Ewallet')
                            .setCustomId('Ewallet')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('💳 Qris')
                            .setCustomId('Qris')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('🌐 Tranfer Pulsa')
                            .setCustomId('Pulsa')
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
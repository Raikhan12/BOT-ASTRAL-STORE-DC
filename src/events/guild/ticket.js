const { EmbedBuilder, PermissionFlagsBits, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ticket = require("../../database/ticket");
const moment = require("moment-timezone");
const config = require("../../config");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isButton()) return;
        const { customId, guild, user } = interaction;
        if (customId === 'create-ticket') {
            await ticket.findOne({ GuildID: guild.id }).then(async (data) => {
                if (!data) {
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            // .setTitle(``)
                            .setDescription(`Cannot create a ticket because this server does not have the feature installed.`)
                            .setColor(config.embed.color)], ephemeral: true
                    });
                } else {
                    if (guild.channels.cache.find(c => c.topic === `${user.id}`)) {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`You still have an open ticket, contact the staff to close the ticket beforehand.`)
                                .setColor(config.embed.color)], ephemeral: true
                        });
                    } else {
                        await guild.channels.create({
                            name: `〘🎫〙ticket・${user.username}`,
                            topic: `${user.id}`,
                            type: ChannelType.GuildText,
                            parent: data.CategoryID,
                            permissionOverwrites: [
                                {
                                    id: guild.id, deny: [
                                        PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: data.SupportID, allow: [
                                        PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ManageChannels,
                                        PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel,
                                        PermissionFlagsBits.UseApplicationCommands, PermissionFlagsBits.AttachFiles,
                                        PermissionFlagsBits.AddReactions, PermissionFlagsBits.ManageRoles
                                    ]
                                },
                                {
                                    id: user.id, allow: [
                                        PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel,
                                        PermissionFlagsBits.AttachFiles, PermissionFlagsBits.AddReactions,
                                        PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.UseApplicationCommands
                                    ]
                                }
                            ]
                        }).then(async (channel) => {
                            await channel.send({
                                content: `<@!${user.id}> <@&${data.SupportID}>`,
                                embeds: [new EmbedBuilder()
                                    //  .setTitle(``)
                                    .setDescription(`<:0:1217088527641088101><:1:1217088530208129024><:2:1217088533974745221><:3:1217088536826871968><:4:1217088539695644763><:5:1217088525447467128> \n\n Selamat datang di sistem tiket kami,\n Mohon berikan alasan Anda membuat tiket ini dan mohon untuk tidak memainkan sistem tiket di server ini. Tunggu staf kami membalas tiket ini.\n\n**NOTE :** Tunggu hingga 1x24 jam dan apabila tidak ada respon dapat menyebutkan salah satu admin di server ini.`)
                                    // .setImage(``)
                                    .setColor(config.embed.color)]
                            }).then(async (msg) => {
                                msg.pin().then(() => {
                                    channel.bulkDelete(1);
                                }).then(async () => {
                                    const logging = await client.channels.cache.get(data.LogID);
                                    if (logging) return logging.send({
                                        embeds: [new EmbedBuilder()
                                            //  .setTitle(``)
                                            .setDescription(`<:0:1217088527641088101><:1:1217088530208129024><:2:1217088533974745221><:3:1217088536826871968><:4:1217088539695644763><:5:1217088525447467128> \n\n There are tickets that have just been made.`)
                                            .addFields([
												{ name: 'TICKET NAME', value: `\`\`\`#${channel.name}\`\`\``, inline: false },
												{ name: 'TICKET ID', value: `\`\`\`#${channel.id}\`\`\``, inline: false },
                                                { name: 'OWNER NAME', value: `\`\`\`${user.tag} \`\`\``, inline: false },
                                                { name: 'OWNER ID', value: `\`\`\`${user.id}\`\`\``, inline: false },
                                                { name: 'TICKET CREATED', value: `\`\`\`${moment(Date.now()).tz('Asia/Jakarta').format('DD MMMM YYYY HH:mm A')}\`\`\``, inline: false },
                                            ])
                                            .setColor(config.embed.color)],
                                        components: [new ActionRowBuilder()
                                        .addComponents(
                                            new ButtonBuilder()
                                                .setLabel('Ticket Channel')
                                                .setURL(`https://discord.com/channels/${guild.id}/${channel.id}`)
                                                .setStyle(ButtonStyle.Link)
                                        )], ephemeral: true
                                    });
                                });
                            }).then(async () => {
                                return interaction.reply({
                                    embeds: [new EmbedBuilder()
                                        //  .setTitle(``)
                                        .setDescription(`<:0:1217088527641088101><:1:1217088530208129024><:2:1217088533974745221><:3:1217088536826871968><:4:1217088539695644763><:5:1217088525447467128> \n\n Successfully created a ticket on this server, press the button below to go to the channel.`)
                                        .setColor(config.embed.color)],
                                    components: [new ActionRowBuilder()
                                        .addComponents(
                                            new ButtonBuilder()
                                                .setLabel('Ticket Channel')
                                                .setURL(`https://discord.com/channels/${guild.id}/${channel.id}`)
                                                .setStyle(ButtonStyle.Link)
                                        )], ephemeral: true
                                })
                            });
                        });
                    }
                }
            });
        }
    }
}

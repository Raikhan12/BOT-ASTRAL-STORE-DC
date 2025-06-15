const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const ticket = require("../../database/ticket");
const moment = require("moment-timezone");
const config = require("../../config");
const sourcebin = require("sourcebin_js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tdelete')
        .setDescription('Delete currently open channel tickets.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction, client) {
        const { guild, options } = interaction;
        const ticketdata = await ticket.findOne({ GuildID: guild.id });
        if (interaction.member.roles.cache.has(`${ticketdata.SupportID}`)) {
            if (ticketdata) {
                if (interaction.channel.parentId === `${ticketdata.CategoryID}`) {
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            // .setTitle(``)
                            .setDescription(`Successfully created a transcript for this ticket and will close this ticket in 5 seconds.`)
                            .setColor(config.embed.color)], ephemeral: true
                    }).then(async () => {
                        const transcriptch = await client.channels.cache.get(ticketdata.TranscriptID)
                        const channel = interaction.channel;
                        await channel.messages.fetch().then(async (messages) => {
                            const content = await messages.reverse().map(m => `${moment(new Date(m.createdAt)).format('LL')} ${moment(Date.now(m.createdAt)).format('HH:mm A')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');
                            const transcript = await sourcebin.create([{ name: `${channel.name}`, content: content, languageId: 'text' }], { title: `TICKET TRANSCRIPT : ${channel.name}` })
                            await channel.messages.fetchPinned().then(async (pinnedMessages) => {
                                const pinnedMessageArray = Array.from(pinnedMessages.values());
                                await pinnedMessageArray.forEach(async (msg) => {
                                    await channel.messages.fetch(msg.id).then(async (created) => {
                                        const datecreate = `${created.createdAt.toUTCString()}`
                                        const owner = await guild.members.fetch(`${channel.topic}`)
                                        return transcriptch.send({
                                            embeds: [new EmbedBuilder()
                                                // .setTitle(``)
                                                .setColor(config.embed.color)
                                                .addFields([
                                                    { name: 'TICKET OWNER', value: `\`\`\`${owner.user.tag}\`\`\``, inline: false },
                                                    { name: 'TICKET SUPPORT', value: `\`\`\`${interaction.user.tag}\`\`\``, inline: false },
                                                    { name: 'TICKET CREATED', value: `\`\`\`${moment(datecreate).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss A')}\`\`\``, inline: false },
                                                    { name: 'TICKET CLOSED', value: `\`\`\`${moment(Date.now()).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss A')}\`\`\``, inline: false },
                                                ])],
                                            components: [new ActionRowBuilder()
                                                .addComponents(
                                                    new ButtonBuilder()
                                                        .setLabel('Transcript Link')
                                                        .setStyle(ButtonStyle.Link)
                                                        .setURL(`${transcript.url}`)
                                                )]
                                        }).then(() => {
                                            setTimeout(function () {
                                                channel.delete();
                                            }, 6000);
                                            return owner.send({
                                                embeds: [new EmbedBuilder()
                                                    // .setTitle(``)
                                                    .setColor(config.embed.color)
                                                    .addFields([
                                                        { name: 'TICKET OWNER', value: `\`\`\`${owner.user.tag}\`\`\``, inline: false },
                                                        { name: 'TICKET SUPPORT', value: `\`\`\`${interaction.user.tag}\`\`\``, inline: false },
                                                        { name: 'TICKET CREATED', value: `\`\`\`${moment(datecreate).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss A')}\`\`\``, inline: false },
                                                        { name: 'TICKET CLOSED', value: `\`\`\`${moment(Date.now()).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss A')}\`\`\``, inline: false },
                                                    ])],
                                                components: [new ActionRowBuilder()
                                                    .addComponents(
                                                        new ButtonBuilder()
                                                            .setLabel('Transcript Link')
                                                            .setStyle(ButtonStyle.Link)
                                                            .setURL(`${transcript.url}`)
                                                    )]
                                            });
                                        });
                                    });
                                });
                            });
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
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");
const feedback = require('../../database/feedback');
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('Make feedback on our service!')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
           .addUserOption((option) => option
            .setName('seller').setDescription('Buyer of the product purchased.').setRequired(true))
        .addChannelOption((option) => option
        .setName('product').setDescription('Products that have been purchased.').setRequired(true))
        .addStringOption((option) => option
            .setName('rating').setDescription('Rating for our service.').setRequired(true)
            .addChoices(
                { name: '1 Star', value: 'a' },
                { name: '2 Star', value: 'b' },
                { name: '3 Star', value: 'c' },
                { name: '4 Star', value: 'd' },
                { name: '5 Star', value: 'e' },
            ))
        .addStringOption((option) => option
            .setName('review').setDescription('A brief review of our products and services.').setRequired(true)),

    async execute(interaction, client) {
        const { guild, options } = interaction;
        await feedback.findOne({ GuildID: guild.id }).then(async (data) => {
            if (data) {
                const star = [
                    `⭐`,
                    `⭐⭐`,
                    `⭐⭐⭐`,
                    `⭐⭐⭐⭐`,
                    `⭐⭐⭐⭐⭐`
                ]

                const Embed = new EmbedBuilder()
                    .setTitle(`${guild.name}'s Feedback`)
                    .setDescription(`<:0:1217088527641088101><:1:1217088530208129024><:2:1217088533974745221><:3:1217088536826871968><:4:1217088539695644763><:5:1217088525447467128> \n\n Thank you, We have a new feedback message!`)
                    .setColor(config.embed.color)
                	.setImage(`https://telegra.ph/file/caddabb4d6c006bec0a37.gif`)
                	.setFooter({ text: `ID Author : ${interaction.user.id}` })
                // .setImage(``)

               switch (options.getString('rating')) {
                    case 'a': {
                        Embed.addFields([
                            { name: 'Seller', value: `${options.getUser('seller')}`, inline: true },
                            { name: 'Buyer :', value: `${interaction.user}`, inline: true },
                            { name: 'Product', value: `${options.getChannel('product')}`, inline: true },
                            { name: 'Rating', value: `${star[0]}`, inline: true },
                            { name: 'Review', value: `\`\`\`${options.getString('review')}\`\`\``, inline: false },
                        ])
                    }
                        break;
                    case 'b': {
                        Embed.addFields([
                            { name: 'Seller', value: `${options.getUser('seller')}`, inline: true },
                            { name: 'Buyer :', value: `${interaction.user}`, inline: true },
                            { name: 'Product', value: `${options.getChannel('product')}`, inline: true },
                            { name: 'Rating', value: `${star[1]}`, inline: true },
                            { name: 'Review', value: `\`\`\`${options.getString('review')}\`\`\``, inline: false },
                        ])
                    }
                        break;
                    case 'c': {
                        Embed.addFields([
                            { name: 'Seller', value: `${options.getUser('seller')}`, inline: true },
                            { name: 'Buyer :', value: `${interaction.user}`, inline: true },
                            { name: 'Product', value: `${options.getChannel('product')}`, inline: true },
                            { name: 'Rating', value: `${star[2]}`, inline: true },
                            { name: 'Review', value: `\`\`\`${options.getString('review')}\`\`\``, inline: false },
                        ])
                    }
                        break;
                    case 'd': {
                        Embed.addFields([
                            { name: 'Seller', value: `${options.getUser('seller')}`, inline: true },
                            { name: 'Buyer :', value: `${interaction.user}`, inline: true },
                            { name: 'Product', value: `${options.getChannel('product')}`, inline: true },
                            { name: 'Rating', value: `${star[3]}`, inline: true },
                            { name: 'Review', value: `\`\`\`${options.getString('review')}\`\`\``, inline: false },
                        ])
                    }
                        break;
                    case 'e': {
                        Embed.addFields([
                            { name: 'Seller', value: `${options.getUser('seller')}`, inline: true },
                            { name: 'Buyer :', value: `${interaction.user}`, inline: true },
                            { name: 'Product', value: `${options.getChannel('product')}`, inline: true },
                            { name: 'Rating', value: `${star[4]}`, inline: true },
                            { name: 'Review', value: `\`\`\`${options.getString('review')}\`\`\``, inline: false },
                        ])
                    }
                        break;
                }
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        // .setTitle(``)
                        .setDescription(`Successfully sent a feedback message on the product purchased and sent to <#${data.ChannelID}>.`)
                        .setColor(config.embed.color)], ephemeral: true
                }).then(async () => {
                    await client.channels.cache.get(data.ChannelID).send({ embeds: [Embed] });
                });
            } else {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        // .setTitle(``)
                        .setDescription(` Failed to execute command because there is no feedback data on this server.`)
                        .setColor(config.embed.color)], ephemeral: true
                });
            }
        });
    }
}
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const testimoni = require('../../database/testimonial');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testimoni')
        .setDescription('Make testimonials for purchasing products on this server!')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addUserOption((option) => option
            .setName('seller').setDescription('Seller of the product purchased.').setRequired(true))
    	.addUserOption((option) => option
            .setName('buyer').setDescription('Buyer of the product purchased.').setRequired(true))
        .addStringOption((option) => option
            .setName('number').setDescription('Order of testimonials to be made.').setRequired(true))
        .addStringOption((channel) => channel
            .setName('product').setDescription('Product purchased by buyer.').setRequired(true))
        .addStringOption((option) => option
            .setName('payment').setDescription('payment metod.').setRequired(true))
        .addStringOption((option) => option
            .setName('price').setDescription('The price of the product purchased by the buyer.').setRequired(true))
        .addStringOption((option) => option
            .setName('image').setDescription('Image proof of successful payment.').setRequired(false)),

 async execute(interaction, client) {
        const { guild, options } = interaction;

        const testimonidata = await testimoni.findOne({ GuildID: guild.id })

        if (!testimonidata) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(config.embed.color)
                .setDescription(`Cannot execute command because there is no data on this server!`)
                .setFooter({ text: `Contact the staff to support this problem!` })], ephemeral: true
        })

        const TestimoniEmbed = new EmbedBuilder()
            .setTitle(`${guild.name}'s Testimonial #${options.getString('number')}`)
            .setDescription(`Thank you for trusting and purchasing our product. \n\n **Seller :**${options.getUser('seller')}\n**Buyer :**${options.getUser('buyer')}\n**Product :**${options.getString('product').replace(/\\n/g, '\n')}\n**Price :**RP ${options.getString('price')}.-`)
            .setImage(options.getString('image'))
        	.setFooter({ text: "Don't forget to /feedback, Thanks!" })
            .setColor(config.embed.color)

        await options.getMember('buyer').roles.add(testimonidata.RoleID).then(async () => {
            await client.channels.cache.get(testimonidata.ChannelID).send({ embeds: [TestimoniEmbed], ephemeral: false }).then(async () => {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor(config.embed.color)
                        .setDescription(`Successfully created testimonial #${options.getString('number')} in <#${testimonidata.ChannelID}> and added ${options.getMember('buyer')} to <@&${testimonidata.RoleID}>`)], ephemeral: true
                })
            })
        })
    }
}
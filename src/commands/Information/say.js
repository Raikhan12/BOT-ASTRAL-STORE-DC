const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make the bot say something')
        .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel where the message will be sent')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to say')
                .setRequired(true)),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const text = interaction.options.getString('message');
        
        if (!channel) return interaction.reply({ content: `Channel not found.`, ephemeral: true });
        
        await channel.send(text);
        await interaction.reply({ content: `Message sent to ${channel}`, ephemeral: true });
    }
};

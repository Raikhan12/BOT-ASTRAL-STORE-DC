const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear messages in the channel')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The number of messages to clear')
                .setRequired(true)),

    async execute(interaction, client) {
        
           const op = interaction.options
 
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({ content: '**You do not have the permissions to use this command**', ephemeral: true})
        
        const amount = interaction.options.getInteger('amount');

        if (amount <= 0 || amount > 100) {
            return interaction.reply({ content: 'You need to input a number between 1 and 100.', ephemeral: true });
        }

        await interaction.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            interaction.reply({ content: 'There was an error trying to clear messages in this channel!', ephemeral: true });
        });

        await interaction.reply({ content: `Successfully cleared ${amount} messages.`, ephemeral: true });
    },
};

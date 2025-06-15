const { EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        const Embed = new EmbedBuilder()
            // .setTitle(``)
            // .setDescription(`Berikut adalah daftar harga dari produk ini.`)
            .setColor(config.embed.color)
            // .setImage(``)

        // Single Button
        if (interaction.customId === 'prod1-a') {
            Embed.addFields([
                { name: 'PRODUCT 1', value: `Blablabla`, inline: true },
                { name: 'PRODUCT 2', value: `Blablabla`, inline: true },
                { name: 'PRODUCT 3', value: `Blablabla`, inline: true },
            ])
            return interaction.reply({ embeds: [Embed], ephemeral: true });
        }

        // Double Button
        if (interaction.customId === 'Ewallet') {
            Embed.setTitle('List Payment E-wallet')
            .setDescription('**GOPAY/DANA/OVO** \n\`\`082230484350\`\`')
            .addFields([
                { name: '**List Pajak/Rates**', value: `Dana : Rp500/transaksi **_(Pembayaran melalui Top Up)_** \nOvo : Rp1.000/transaksi **_(Pembayaran melalui Top Up)_**`, inline: false },
                { name: '**Note :**', value: `Tidak menerima Pembayaran Melalui Bot`, inline: false },
            ])
            return interaction.reply({ embeds: [Embed], ephemeral: true });
        } else if (interaction.customId === 'Qris') {
            Embed.setTitle('List Payment Qris')
            .setDescription('**Note :** \n- Tidak menerima Pembayaran Melalui Bot \n- Proses Refund 2x24 jam \n- Kita menggunakan Qris All Payment')
            .setImage(`https://telegra.ph/file/ae35d60d47ce9045000cd.jpg`)
            return interaction.reply({ embeds: [Embed], ephemeral: true });
        }  else if (interaction.customId === 'Pulsa') {
            Embed.addFields([
                { name: 'PRODUCT 1', value: `Blablabla`, inline: true },
                { name: 'PRODUCT 2', value: `Blablabla`, inline: true },
                { name: 'PRODUCT 3', value: `Blablabla`, inline: true },
            ])
            return interaction.reply({ embeds: [Embed], ephemeral: true });
        }
    }
}
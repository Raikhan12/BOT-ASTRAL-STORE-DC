const { EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        const Embed = new EmbedBuilder()
            // .setTitle(``)
            .setDescription(`Berikut adalah daftar harga dari produk ini.`)
            .setColor(config.embed.color)
            // .setImage(``)

        // Single Button
        if (interaction.customId === 'prod1-a') {
            Embed.addFields([
                { name: 'Create Qris', value: `Akun Buyer : 5K Ewallet
                Akun Seller : 10K Ewallet`, inline: true },
                { name: 'Benefit ⚡', value: `- Mendapatkan Qris All payment \n- Terdapat produk qris to pulsa \n- Terdapat produk qris to ewallet \n- Terdapat produk top up games dan voucher games \n- Qris berupa Apk, bukan link \n- Qris melalui email dan password ( buyer & seller) \n- Bisa beli kuota lewat qris \n- Ada tutorial top up`, inline: false },
                { name: '«▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬»', value: `Seller : <@941294533260476417> \n Order : <#1216967458858991637> \n «▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬»`, inline: false },
            ])
            return interaction.reply({ embeds: [Embed], ephemeral: true });
        }
        
        if (interaction.customId === 'prod1-b') {
            Embed.addFields([
                { name: 'Jasa Setup Bot', value: `- Welcome Logs. \n- Invite Logs. \n- Anti Raid. \n- Ticket. \n- Server Status. \n- Leveling. \n Dst. \n\n Price : Rp. 1.000/Bots.`, inline: true },
                { name: '«▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬»', value: `Seller : <@941294533260476417> \n Order : <#1216967458858991637> \n «▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬»`, inline: false },
            ])
            return interaction.reply({ embeds: [Embed], ephemeral: true });
        }

        if (interaction.customId === 'prod1-c') {
            Embed.addFields([
                { name: 'Build Bot', value: `- BOT VERIFY \n Price: 25.000 \n- Reaction Role \n Price: 25.000 \n- Sticky Message \n Price: 25.000 \n- Anti Link \n Price: 25.000 \n- Bot Embed \n Price: 25.000 \n- Welcomer \n Price: 25.000 \n- ANTI RAID \n Price: 30.000 \n- BOT MUSIC SIMPLE \n Price: 30.000 \n- PTERODACTYL UPTIME \n Price: 20.000 \n- TICKET BOT SIMPLE \n Price: 25.000 \n- Custom Command \n Price: 5.000 per Command \n\n AND MORE BISA TANYA DI TICKET.`, inline: true },
                { name: 'NOTED', value: `- Harga Di Atas Beleum Termasuk Harga Untuk Hosting Bot Nya.\n- Bebas Request Nama Bot Nya.\n- Mau Tanya Tentang Fitur Nya ? Atau Mau Tanya Tanya Tentang Bot Di Atas Bisa Ke Ticket`, inline: false },
                { name: '«▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬»', value: `Seller : <@941294533260476417> \n Order : <#1216967458858991637> \n «▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬»`, inline: false },
            ])
            return interaction.reply({ embeds: [Embed], ephemeral: true });
        }

        // Double Button
        if (interaction.customId === 'prod1-d') {
            Embed.addFields([
                 { name: '💎 Diamond Kecil', value: `- 3 Diamonds \n Price: 1.500 \n- 5 Diamonds \n Price: 2.000 \n- 12 Diamonds \n Price: 4.000 \n- 19 Diamonds \n Price: 6.000 \n- 28 Diamonds \n Price: 8.500 \n- 44 Diamonds \n Price: 13.500 \n- 59 Diamonds \n Price: 16.000`, inline: true },
                { name: 'NOTED', value: `Mengirim ID akun yang salah , uang tidak akan direffund,karena itu bukan tanggung jawab saya.`, inline: false },
                { name: '«▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬»', value: `Seller : <@941294533260476417> \n Order : <#1216967458858991637> \n «▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬»` },
            ])
            return interaction.reply({ embeds: [Embed], ephemeral: true });
        } else if (interaction.customId === 'prod2-b') {
            Embed.addFields([
                { name: 'PRODUCT 1', value: `Comming Soon`, inline: true },
                { name: 'PRODUCT 2', value: `Comming Soon`, inline: true },
                { name: 'PRODUCT 3', value: `Comming Soon`, inline: true },
            ])
            return interaction.reply({ embeds: [Embed], ephemeral: true });
        }
    }
}
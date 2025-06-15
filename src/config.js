module.exports = {
    client: {
        token: 'MTIxNDI0MzIwMjc2NTI5OTc5Mg.GJMLqY._RQMYLo4WxDfq7nEHGAAkSR1nMz4a4MMFlHktU',  // Ambil discord bot token yang bisa diambil di https://discord.com/developers/applications
        id: '1214243202765299792', // Ambil discord bot id yang bisa diambil di https://discord.com/developers/applications
        guild: '1190699016606974066', // Ambil server id sebagai server developer untuk bot ini
        database: 'mongodb+srv://RAKA:rakaraikhan123@cluster0.g9lkamp.mongodb.net/?retryWrites=true&w=majority'  // Ambil url database di https://mongodb.com/ ( tutorial pembuatan dan pengambilan https://www.youtube.com/watch?v=HhHzCfrqsoE&t=192s&pp=ygUZaG93IHRvIGNyZWF0ZSBtb25nb2RiIHVybA%3D%3D )
    },
    embed: {
        color: 'c62bdb',  // Dapat diubah dengan color hex lain asalkan formatnya disamakan ( Contoh : 0xff012f, 0x10aa64 )
    },
    member: {
        guild: '1190699016606974066' // Ambil server id untuk fetching data member untuk activity
    }
}

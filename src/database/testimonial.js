const { model, Schema } = require('mongoose')

module.exports = model("TestimoniSchema", new Schema({
    GuildID: String,
    ChannelID: String,
    RoleID: String
}))
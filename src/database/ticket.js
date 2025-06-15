const { model, Schema } = require("mongoose");

module.exports = model('botTicketSchema', new Schema({
    GuildID: String,
    ChannelID: String,
    TranscriptID: String,
    LogID: String,
    CategoryID: String,
    SupportID: String
}))
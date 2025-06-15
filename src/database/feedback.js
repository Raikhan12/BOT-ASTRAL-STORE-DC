const { model, Schema } = require('mongoose')

module.exports = model("FeedbackSchema", new Schema({
    GuildID: String,
    ChannelID: String
}))
const { model, Schema } = require('mongoose')

module.exports = model("PaymentSchema", new Schema({
    GuildID: String,
    Dana: String,
    Gopay: String,
    Ovo: String,
    Qris: String,
}))
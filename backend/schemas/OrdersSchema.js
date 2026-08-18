const { Schema, model } = require("mongoose");

const OrdersSchema = new Schema({
name: String,
qty: Number,
price: Number,
model: String,
});

module.exports = { OrdersSchema };

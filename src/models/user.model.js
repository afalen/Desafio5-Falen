const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role: String
})

const usuario = mongoose.model("users", userSchema)

module.exports = usuario
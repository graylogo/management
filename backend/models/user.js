const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 创建 Schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    passwd:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: new Date()
    },
})

module.exports = user = mongoose.model('users',UserSchema)
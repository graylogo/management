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
    identity: {
        // 0 普通员工   1 管理员
        type: Number
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = user = mongoose.model('users',UserSchema)
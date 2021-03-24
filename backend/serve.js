const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

// 引入api
const users = require('./routers/api/users')

const {mongoUrl} = require('./config/keys.js')

// 使用body-parser中间件  处理post中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
 
// 连接数据库
mongoose.connect(mongoUrl,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('数据库连接成功！');
}).catch(err=>{
    console.log(err);
})
app.get('/',(req,res)=>{
    res.send('hello!')
})
 // 使用users    中间件
 app.use('/api/users',users)


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Serve run in ${port}`);
})
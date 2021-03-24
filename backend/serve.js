const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

// 引入api
const users = require('./routers/api/users')
const profile = require('./routers/api/profile')

const {mongoUrl} = require('./config/keys.js')

// 使用body-parser中间件  处理post中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
 
// passport 初始化   验证token
app.use(passport.initialize())

// 连接数据库
mongoose.connect(mongoUrl,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('数据库连接成功！');
}).catch(err=>{
    console.log(err);
})
// app.get('/',(req,res)=>{
//     res.send('hello!')
// })

// passport 初始化   验证token
app.use(passport.initialize())
// 将业务放到别的文件里面接   passport为传递过去的参数
require('./config/passport')(passport)

 // 使用users    中间件
 app.use('/api/users',users)

 app.use('/api/profile',profile)


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Serve run in ${port}`);
})
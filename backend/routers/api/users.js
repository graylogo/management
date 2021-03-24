// 登陆注册api
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const gravatar = require('gravatar');
const jwt  = require('jsonwebtoken');
const {secret} = require('../../config/keys')
const User = require('../../models/user')
const passport = require('passport');
const { session } = require('passport');

// $route GET api/users/test
// @desc  返回请求的JSON数据
// access  public
// router.get('/test',(req,res)=>{
//     res.json({msg: 'json数据'})
// })


// $route post api/users/register
// @desc  注册接口
// access  public
router.post('/register',(req,res)=>{
    // 查询数据库中是否有邮箱
    User.findOne({email: req.body.email}).then(user=>{
        if(user){
            return res.status(400).json('邮箱已被注册！')
        }else{
            // 获取默认头像   gravatar插件
            const img = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                passwd: req.body.passwd,
                avatar: img,
                identity: req.body.identity
            })
            // bcrypt 密码加密
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.passwd, salt, function(err, hash) {
                    // Store hash in your password DB.
                    if(err) throw err
                    newUser.passwd = hash
                    newUser.save().then(user=>res.json(user))
                    .catch(err=>console.log(err))
                });
            });
        }
    })
})


// $route post api/users/login
// @desc  登陆接口  返回token    jwt
// access  public
router.post('/login',(req,res)=>{
    const email = req.body.email
    const passwd = req.body.passwd
    // 查询数据库
    User.findOne({email})
        .then(user=>{
            if(!user){
                return res.status(400).json('用户不存在！')
            }
            //密码匹配
            bcrypt.compare(passwd, user.passwd)
                .then(isMatch=>{
                    if(isMatch){
                        const rule = {
                            id: user.id,
                            name:user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        }
                        // jwt.sign(规则，secret，过期时间，箭头函数)
                        jwt.sign(rule,secret,{expiresIn: 3600},(err,token)=>{
                            if(err) throw err
                            // token    前面区许家山特定字段  Bearer
                            res.json({
                                success: true,
                                token: "Bearer "+token
                            })
                        })
                    }else{
                        return res.status(400).json( '密码不正确！')
                    }
                })
        })
})

// $route get api/users/current
// @desc  current user
// access  Private
// router.get('/current','验证token',(req,res)=>{
//     res.json({msg: 'success!'})
// })
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log(req.user);
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
})

module.exports = router
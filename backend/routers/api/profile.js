// 资金api
const express = require('express')
const router = express.Router()
const passport = require('passport');
const Profile = require('../../models/profile');

// $route GET api/profile/test
// @desc  返回请求的JSON数据
// access  public
// router.get('/test',(req,res)=>{
//     res.json({msg: 'json数据'})
// })


// $route post api/profile/add
// @desc  添加资金接口
// access  Private
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profileDetail = {}
    if(req.body.type) profileDetail.type = req.body.type
    if(req.body.describe) profileDetail.describe = req.body.describe
    if(req.body.income) profileDetail.income = req.body.income
    if(req.body.expend) profileDetail.expend = req.body.expend
    if(req.body.cash) profileDetail.cash = req.body.cash
    if(req.body.remark) profileDetail.remark = req.body.remark
    new profile(profileDetail).save().then(profile=>{
        res.json(profile)
    })
})
// $route post api/profile/
// @desc  查询所有信息
// access  Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
   Profile.find().then(profile=>{
       if(!profile || profile.length===0){
           return res.status(400).json('没有内容！')
       }
       res.json(profile)
   }).catch(err=>res.status(400).json(err))
   next()
})

// $route post api/profile/:id
// @desc  查询单个信息
// access  Private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id}).then(profile=>{
        if(!profile || profile.length===0){
            return res.status(400).json('没有找到！')
        }
        res.json(profile)
    }).catch(err=>res.status(400).json(err))
 })

module.exports = router
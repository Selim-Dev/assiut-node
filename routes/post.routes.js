const express = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const router = express.Router();


const verifyUser = async (req,res,next)=>{
	// verify user
	const token = req.headers.authorization.split(' ')[1]
	if(!token) return next(new AppError('token not provided',403))// unauthorized
	console.log("🚀 ~ router.post ~ token:", token)
	const payload = jwt.verify(token,'my-very-secure-secret');
	console.log("🚀 ~ router.post ~ payload:", payload)
	const user = await User.findById(payload.id)
	if(!user) return next(new AppError('invalid token',403))// unauthorized
	req.user = user
	next();
}


router.post('/',verifyUser,async(req,res)=>{
	console.log("user from middleware",req.user)
	// get users
	res.send({user:req.user})
})
router.get('/',(req,res)=>{
	console.log("user from middleware",req.user)
	res.send('get all posts ')
})
router.get('/:id',(req,res)=>{
	res.send('get one  post')
})
router.patch('/:id',(req,res)=>{
	res.send('edit one  post')
})
router.delete('/:id',(req,res)=>{
	res.send('delete one  post')
})


module.exports  = router;
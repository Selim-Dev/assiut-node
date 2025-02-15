const Joi = require('joi')
const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const AppError = require("../utils/AppError");


const registerUser = async (req,res,next)=>{
	const {name, email, password}= req.body;
	const hashedPassword = await bcrypt.hash(password,+process.env.SALT_ROUND) 
	const user = await User.create({name, email, password:hashedPassword})
	res.send(user)
}


const login = async (req,res,next)=>{
	const {email, password} = req.body;
	const user = await User.findOne({email}).select('+password')
	if(!user) throw new AppError('invalid crednetials',400)
	const userPasswordRight = await bcrypt.compare(password, user.password);
	if(!userPasswordRight) throw new AppError('invalid crednetials',400)
	const topSecret= process.env.SECRET
	const token = jwt.sign({id: user._id},topSecret);
  res.send({token})
}

module.exports = {registerUser,login}
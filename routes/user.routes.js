const express = require('express')
const AppError = require('../utils/AppError');
const { registerUser, login } = require('../controllers/user.controller');
const User = require('../models/User');
const router = express.Router();

// const validate = (req,res,next)=>{
// 	const {error}  = loginSchema.validate(req.body)
// 	if(error){
// 		return next(new AppError(error.details[0].message, 400, error.details))
// 	}
// }


// const registerSchema = Joi.object({
// 	name: Joi.string().required(),
// 	email:Joi.string().required(),
// 	password:Joi.string().required(),
// })
// const loginSchema = Joi.object({
// 	email: Joi.string().min(2).max(30).email().required(),
// 	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
// })



router.post('/',registerUser);
router.post('/login',login);
router.get('/',async (req,res,next)=>{
	console.log('getUser')
	const users = await User.find();
	res.send(users)
})
module.exports = router;
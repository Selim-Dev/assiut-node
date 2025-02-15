const mongoose = require('mongoose')
const {Schema} = mongoose;


const userSchema = new Schema({
	name:{
		type: 'string',
		required: true
	},
	email: {
		type: 'string',
		required: true,
		unique: true
	},
	password: {
		type: 'string',
		required: true,
		select: false
	}
})



const User = mongoose.model("User",userSchema);
module.exports = User;
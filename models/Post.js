const mongoose = require('mongoose')
const {Schema} = mongoose;


const postSchema = new Schema({
	title: {
		type: 'string'
	},
	content: {
		type: 'string'
	}
})




const Post = mongoose.model("Post",postSchema);
module.exports = Post;
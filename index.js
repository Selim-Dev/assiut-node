const express = require('express');
require('dotenv').config();
require('express-async-errors')
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express()
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const port = process.env.PORT || 5000

// middlwares
app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('dev'))

app.get('/',(req,res)=>{
	res.send("Hello world")
})


// handlers /users
app.use('/users',userRouter)
app.use('/posts',postRouter)











// default error handler
app.use((err,req,res,next)=>{
	res.status(err.statusCode || 500).send({
		statusCode: err.statusCode || 500,
		message: err?.message || 'something went wrong',
		errors : err?.errors || []
	})
})
// connect to db
process.env.DB_CONNECTION
console.log("🚀 ~ process.env.DB_CONNECTION:", process.env.DB_CONNECTION)
mongoose.connect(process.env.DB_CONNECTION)
	.then(()=>console.log('DB Connected Successfully'))
	.catch(err=>console.log(`something went wrong with db ${err}`))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


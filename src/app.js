require('dotenv').config();
const express = require('express')

const useUserRouter = require('./routes/user.route')
const useBlogRouter = require('./routes/blog.route')
const app = express();

app.use("/users",useUserRouter)
app.use("/blogs",useBlogRouter)
app.listen(5000,()=>{
   console.log('Server running on http://localhost:5000');
})




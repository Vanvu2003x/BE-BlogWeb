const express = require('express')
const app = express.Router();
const upload = require('../middlewares/upload.middleware')

app.use(express.json())
const auth = require("../middlewares/auth.middleware")
const blogController = require("../controllers/blog.controller")
app.get('/',blogController.getAllBlogs)
app.post('/upload',auth.authenticateToken,upload.array('files',10),blogController.addBlog)
app.delete('/:blog_id',auth.authenticateToken,blogController.deleteBlog)
app.patch('/:blog_id',auth.authenticateToken,upload.array('files',10),blogController.updateBlog)
app.get('/user/:user_id',blogController.getBlogbyUserID)
module.exports = app;
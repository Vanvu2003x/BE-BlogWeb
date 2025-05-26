const express = require('express')
const app = express.Router()
const UserController = require('../controllers/user.controller')

app.use(express.json())
app.use(express.text())
app.get('/',UserController.getUsers);
app.post('/login',UserController.checkUser)
app.post('/register',UserController.addUser);
module.exports = app;
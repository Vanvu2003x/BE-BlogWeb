const { json } = require('express');
const userModel = require('../models/user.model')
const jwt = require('../utils/jwt')
const bcrypt = require('bcrypt')
async function getUsers(req,res) {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

async function checkUser(req,res) {
    try {
        let data = req.body;
        if(typeof data =='string')
            data = JSON.parse(data)
        const user = await userModel.checkUser(data.username);
        if(!user)
            return res.status(400).json({error:"Username sai"});

        const isValid = await bcrypt.compare(data.password, user.hash_password);
        if(!isValid)
            return res.status(400).json({error:"Password sai"});

        res.json({status:"success", token : jwt.generateToken(user.user_id)});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


async function addUser(req,res) {
    try {
        const user = req.body;
        const hash_password = await bcrypt.hash(user.password, 10);

        user.hash_password = hash_password;
        await userModel.addUser(user);
        res.json({message:"Đã thêm thành công"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}



module.exports = {getUsers,addUser,checkUser}
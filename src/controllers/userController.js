const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 5;

const secretKey = "Strong key"

const UserSchema = new mongoose.Schema({
    username: String,
    email: {type: String, unique: true},
    password: String,
});

const UserModel = mongoose.model('user', UserSchema);

const getUsers = async(req, res) => {
    const users = await UserModel.find()
    res.send(users)
}

const registerUser = async(req, res) => {
    const userData = {
        username: req.body.username,
        email: req.body.email
    }
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
        console.log(hash)
        console.log(err)
        userData.password = hash
        const newuser = await UserModel.create(userData)
        res.send("Registered successfully")
    });
    console.log(userData)
}

const loginUser = async(req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password

    const user = await UserModel.findOne({email:userEmail})

    if (user){
        bcrypt.compare(userPassword, user.password, function(err, result) {
            if(result){
                var token = jwt.sign({email: userEmail}, secretKey);
                console.log(user)
                res.send(token)
            }else{
                res.status(401).json({"message": "Invalid credentials"})
            }
        });
        
    }else{
        res.status(401).json({"message": "Invalid credentials"})
    }
}




module.exports = {getUsers, registerUser, loginUser, UserModel}


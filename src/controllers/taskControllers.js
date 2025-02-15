const mongoose = require('mongoose')
var jwt = require('jsonwebtoken');
const {UserModel} = require("./userController")

const secretKey = "Strong key"

const Schema = mongoose.Schema


const taskSchema = new Schema({
    title: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
})

const TaskModel = mongoose.model('task', taskSchema)

let getAllTasks = async (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, secretKey, async function(err, decoded) {
        const email = decoded.email
        const user = await UserModel.findOne({email:email})
        console.log(user)
        const tasks = await TaskModel.find({owner: user._id}).populate("owner");
        res.send(tasks)
    })
}

const createTask = async (req, res) => {
    console.log(req.body.newTask)
    userToken = req.headers.authorization.split(" ")[1]
    jwt.verify(userToken, secretKey, async function(err, decoded) {
        let userEmail = decoded.email
        let user = await UserModel.findOne({email: userEmail})
        console.log("================================",user)
        await TaskModel.create({ title: req.body.newTask, owner: user._id});
    });
    res.send("Success")
}

const deleteTask = async (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    // try{
    //     const data = await TaskModel.findByIdAndDelete(id)
    //     console.log(data)
    //     if (data){
    //         res.send("Success") 
    //     }else{
    //         res.status(404).send("Task not found")
    //     }
    // }catch(err){
    //     res.status(400).send("Bad request. Please send existing ID")
    // }
    TaskModel.findByIdAndDelete(id)
    .then(data => {
        console.log(data)
        if (data){
            res.send("Success") 
        }else{
            res.status(404).send("Task not found")
        }
    })
    .catch(err => {
        console.log("err")
        res.status(400).send("Error")
    })
}

const updateTask = async (req, res) => {
    const id = req.params.id
    const updatedTitle = req.body.updatedTitle

    await TaskModel.findByIdAndUpdate(id, { title: updatedTitle })
    res.send("Success")
}

module.exports = {getAllTasks, createTask, deleteTask, updateTask}
const express = require("express")
const router = express.Router()
const {getAllTasks, createTask, deleteTask, updateTask} = require("../controllers/taskControllers")

router.get('/', (req, res, next) => {
    console.log("Test middleware")
    next()
}, getAllTasks)

router.post("/newTask", createTask)

router.delete("/delete-task/:id", deleteTask)
router.put("/edit-task/:id", updateTask)

module.exports = router

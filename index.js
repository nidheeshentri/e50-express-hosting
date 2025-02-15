const express = require('express')
const TaskRouter = require('./src/routes/taskRouter')
const mongoose = require('mongoose');
const UserRouter = require("./src/routes/userRouter")
var cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:5173'
}

const app = express()
const port = 3000


mongoose.connect('mongodb+srv://nidheeshb:9XEadEWqyz5AXbTn@main.rzali.mongodb.net/?retryWrites=true&w=majority&appName=main')
.then(()=>{
  console.log("DB connected")
})
.catch((err) => {
  console.log(err)
  console.log("DB connection error")
})

app.use(cors(corsOptions))

app.use(express.json())


app.use("/task",TaskRouter)
app.use("/account", UserRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const TaskRouter = require('./src/routes/taskRouter')
const mongoose = require('mongoose');
const UserRouter = require("./src/routes/userRouter")

require("dotenv").config()

var cors = require('cors')

var corsOptions = {
  origin: 'https://e50-react-host.vercel.app'
}

const app = express()
const port = process.env.PORT
const DB_CONNECTION_LINK = process.env.DB_CONNECTION_LINK


mongoose.connect(DB_CONNECTION_LINK)
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
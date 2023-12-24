const express = require('express')
const cors = require('cors')
require('dotenv').config();
const fileUpload = require('express-fileupload');


const route = require('./routes/route')
const {connectDB} = require('./db/connectDB')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000', // Replace this with the origin of your frontend
}))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
  }));

app.use('/api/v1',route)

const main = async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(8000,()=>{
            console.log("listen on 5000")
        })
    } catch (error) {
        console.log(error)
    }
}

main()



const express = require('express')
const cors = require('cors')
require('dotenv').config();
const fileUpload = require('express-fileupload');


const route = require('./routes/route')
const {connectDB} = require('./db/connectDB')

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
  }));

app.use('/api/v1',route)
MONGO_URL = 'mongodb+srv://priyanshu07804:1234@blog.4olgs9h.mongodb.net/POSTS?retryWrites=true&w=majority'

const main = async()=>{
    try {
        await connectDB(MONGO_URL)
        app.listen(8000,()=>{
            console.log("listen on 5000")
        })
    } catch (error) {
        console.log(error)
    }
}

main()



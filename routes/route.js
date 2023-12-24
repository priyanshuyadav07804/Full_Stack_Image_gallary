const express = require('express')
const route = express.Router();
const {getAllBlog,postBlog,updateBlog,deleteBlog, getBlog} = require("../controllers/controller")


route.get('/',getAllBlog)
route.post('/',postBlog)
route.patch('/update/:id',updateBlog)
route.delete('/delete/:id',deleteBlog)
route.get('/:id',getBlog)

module.exports = route
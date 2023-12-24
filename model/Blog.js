const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    "title":{
        type:String,
        require:[true,"Title not Provided"],
        trim:true
    },
    "desc":{
        type:String,
    },
    "photo":{
        type:String,
        require:[true,"Image url not provided"]
    },

})

module.exports = mongoose.model("Blog",blogSchema);
const Blog = require('../model/Blog')
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dkbqauksm',
    api_key: '777717464413222',
    api_secret: 'NszwGvqpfI7dOEB4IFg46d48y5M'
});

const getBlog = async(req,res)=>{
    try {
        const {id:blogId} = req.params
        const data = await Blog.findById(blogId)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllBlog = async(req, res) => {
    try {
        const data = await Blog.find({});
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

const postBlog = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const file = req.files.image;
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'images',
            resource_type: 'auto',
            public_id: `${Date.now()}`
        });

        const { title, desc } = req.body
        const data = new Blog({ title, desc, photo: result.secure_url })
        await data.save()
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
    }
}

const updateBlog = async(req, res) => {
    try {
        const {id : blogId} = req.params
        const {title,desc} = req.body
        const data = await Blog.findByIdAndUpdate(blogId,{title,desc},{
            new:true,
            runValidators : true
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteBlog = async(req, res) => {
    try {
        const {id:blogId} = req.params
        await Blog.findByIdAndDelete(blogId);
        res.status(200).json("item deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { getAllBlog, postBlog, updateBlog, deleteBlog,getBlog }
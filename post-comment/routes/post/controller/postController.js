const Post = require("../model/Post");
const User = require("../../user/model/User");
const errorHandler = require("../../utils/errorHandler/errorHandler");

async function createPost(req,res){
    try{
    const {title, post} = req.body;

    const decodedData = res.locals.decodedData;

    let foundUser = await User.findOne({email: decodedData.email});

    const newPost = new Post({
        title,
        post,
        owner: foundUser._id,
    });

    let savedPost = await newPost.save();
    res.json({message: "success", payload: savedPost});
    }catch(e){
        res.status(500).json({message: "error", error: errorHandler(e)});
    }
};

async function getAllPost (req,res){
    try{
        let foundAllPost = await Post.find({}).populate("owner", "username");
        res.json({message: "success", payload: foundAllPost});
    }catch(e){
        res.status(500).json({message: "error", error: errorHandler(e)});
    }
}

async function updatePost (req,res){
    try{
        let updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body,{new: true});
        res.json({message: "success", payload: updatedPost});
    }catch(e){
        res.status(500).json({message: "error", error: errorHandler(e)});
    }
}

async function deletePost (req,res){
    try{
        let deletedPost = await Post.findByIdAndDelete(req.params.id);

        const decodedData = res.locals.decodedData;

        let foundUser = await User.findOne({email: decodedData.email});

        let userPostArray = foundUser.postHistory;
        let filteredPostArray = userPostArray.filter(
            (post) => post._id !== deletedPost._id
        );
        foundUser.postHistory = filteredPostArray;

        await foundUser.save();
        res.json({message: "success", payload: deletedPost});
    }catch(e){
        res.status(500).json({message: "error", error: errorHandler(e)});
    }
}


module.exports ={
    createPost,
    getAllPost,
    updatePost,
    deletePost,
};
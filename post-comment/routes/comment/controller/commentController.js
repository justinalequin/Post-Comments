const Comment = require("../model/Comment");
const User = require("../../user/model/User");
const Post = require("../../post/model/Post");
const errorHandler = require("../../utils/errorHandler/errorHandler");

async function getAllUserComment(req,res){
    try{
        const decodedData = res.locals.decodedData;
        let foundUser = await User.findOne({email: decodedData.email});
        let allComments = await Comment.find({owner: foundUser._id});
        res.json({message: "success", payload: allComments});
    }catch(e){
        res.status(500).json({message: "error", error: errorHandler(e)});
    }
}
async function createComment(req,res){
    try{
        const decodedData = res.locals.decodedData;
        let foundUser = await User.findOne({email: decodedData.email});
        let createNewComment = new Comment({
            comment: req.body.comment,
            post: req.params.id,
            user: foundUser._id,
        });

        let savedComment = await createNewComment.save();
        foundUser.commentHistory.push(savedComment._id);
        await foundUser.save()
        let foundPost = await Post.findById(req.params.id)
        foundPost.commentHistory.push(savedComment._id);
        await foundPost.save();
    }catch(e){
        res.status(500).json({message: "error", error: errorHandler(e)});
    }
};
async function deleteComment(req,res){
    try{
        let deletedComment = await Comment.findByIdAndDelete(req.params.id);
        let foundPost = await Post.findById(deletedComment._id);
        let foundPostCommentArray = foundPost.commentHistory;
        let filteredfoundPostCommentArray = foundPostCommentArray.filter(
            (comment) => `${comment._id}` !== `${deletedComment._id}`
        );

        foundPost.commentHistory = filteredfoundPostCommentArray;
        await foundPost.save();

        const decodedData = res.locals.decodedData;
        let foundUser = await User.findOne({email: decodedData.email});
        let foundUserCommentArray = foundUser.commentHistory;
        let filteredfoundCommentArray = foundUserCommentArray.filter(
            (comment) => `${comment._id}` !== `${deletedComment._id}`
        );

        foundUser.commentHistory = filteredfoundCommentArray;
        await foundUser.save();


    }catch(e){
        res.status(500).json({message: "error", error: errorHandler(e)});
    }
};

module.exports ={
    getAllUserComment,
    createComment,
    deleteComment,
};
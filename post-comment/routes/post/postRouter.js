
const express = require("express");
const router = express.Router();

const {checkJwt,checkIsEmpty} = require("../lib/auth");
const {createPost, getAllPost,deletePost,updatePost} = require("./controller/postController");

router.get("/", getAllPost);
router.post("/create-post", checkJwt, createPost);
router.delete("/delete-post-by-id/:id",checkJwt,checkIsEmpty,deletePost);
router.put("/update-post-by-id/:id",checkJwt,checkIsEmpty,updatePost);

module.exports = router;
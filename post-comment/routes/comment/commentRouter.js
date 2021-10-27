
const express = require("express");
const router = express.Router();

const {checkJwt,checkIsEmpty} = require("../lib/shared");
const {getAllUserComment,createComment,deleteComment} = require("./controller/commentController");

router.get("/", getAllUserComment);
router.post("/create-comments", checkJwt, createComment);
router.delete("/delete-comments-by-id/:id",checkJwt,checkIsEmpty,deleteComment);

module.exports =router;
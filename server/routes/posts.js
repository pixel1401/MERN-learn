import express  from "express";
import {verifyToken} from "../middleware/auth.js"
import {getFeedPosts , getUserPosts , likePost , addComment} from "../controllers/posts.js";


const router = express.Router();

// READ
router.get('/' , verifyToken , getFeedPosts);
// router.get('/:userId/posts' , verifyToken , getUserPosts);
router.get('/getPostsUser' , verifyToken , getUserPosts);

// UPDATE
// router.patch("/:id/like" , verifyToken , likePost);
router.patch("/likePost" , verifyToken , likePost); 
router.patch("/addComment" , verifyToken , addComment); 

export default router;
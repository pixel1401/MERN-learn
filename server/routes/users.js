import express  from "express";
import {verifyToken} from "../middleware/auth.js"
import {getUsers , getUserFriends , addRemoveFriend} from "../controllers/users.js";


const router = express.Router();


// READ
router.get('/getUser' , verifyToken , getUsers);
// router.get("/:id/friends" , verifyToken , getUserFriends);
router.get("/getFriends" , verifyToken , getUserFriends);

// UPDATE
// router.patch('/:id/:friendId' , verifyToken , addRemoveFriend);
router.patch('/patchFriend' , verifyToken , addRemoveFriend);

export default router;
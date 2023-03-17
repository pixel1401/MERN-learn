import express  from "express";
import {verifyToken} from "../middleware/auth.js"
import {addMessage , getMessages} from '../controllers/message.js';


const router = express.Router();


router.post("/addmsg/", verifyToken ,addMessage);
router.post("/getmsg/", verifyToken , getMessages);


export default router;
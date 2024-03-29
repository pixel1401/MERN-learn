import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
// import { fileURLToPath } from "url";
import http from 'http';
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";



import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import messageRoutes from "./routes/message.js";

import { verifyToken } from "./middleware/auth.js";

import User from "./models/User.js";
import Post from "./models/Post.js";

import {updateInfoCurrentUser} from "./controllers/users.js";

import { users, posts } from "./data/index.js"
import { getUsers } from "./controllers/users.js";
import { Server } from "socket.io"; 

import __dirname from "./dirname.js";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

console.log(__dirname);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));




app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));



// FILE STORAGE
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname == 'picture') {
      cb(null, process.env.ASSETS_IMG);
    }else if (file.fieldname == 'audio') {
      cb(null, process.env.ASSETS_AUDIO);
    }else {
      cb(null, false)
    }

  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storageConfig });



// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.fields([{name : 'picture'} , {name : 'audio'}]),   createPost);

app.post('/userInfo' , verifyToken , upload.single("picture") ,  updateInfoCurrentUser ) 



// ROUTES
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use("/messages", messageRoutes);



// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((res) => {
  // app.listen(PORT ,  ()=> console.log(`Server PORT : ${PORT}`));
  console.log(' mongoose connect');

  // User.insertMany(users);
  // Post.insertMany(posts);


}).catch((err) => console.log(`${err} error`)
)





// socket

const server = http.createServer(app );

const io = new Server(server,  {
  cors : {
    origin: "*",
    credentials: true,
  }
});

io.listen(server);

server.listen(PORT, () =>
console.log(`Server started on ${PORT}`))







global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("socket connection : ", socket.id);
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log(sendUserSocket , data.msg);
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
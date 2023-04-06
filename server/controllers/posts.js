import Post from "../models/Post.js";
import User from "../models/User.js"

// CREATE

export const createPost = async (req , res) => {
    try {
        const {userId , description , picturePath , audioPath} = req.body;
        const user = await User.findById(userId);

        console.log(userId , description , picturePath , audioPath , req.body);

        const newPost = new Post({
            userId,
            firstName : user.firstName,
            lastName : user.lastName,
            location :  user.location,
            description ,
            picturePath,
            audioPath : audioPath ,
            userPicturePath : user.picturePath,

            likes : {},
            comments : []
        });

        await newPost.save();

        const posts = await Post.find();

        res.status(201).json(posts);

    }catch (err) {
        res.status(409).json({message: err.message});
    }
}



export const getFeedPosts = async (req , res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
        
    }catch (err) {
        res.status(404).json({message: err.message});
    }
}



export const  getUserPosts = async (req , res) => {
    try{
        const {userId} = req.query;
        const posts = await Post.find({userId});
        res.status(200).json(posts);

    }catch(err) {
        res.status(405).json({message: err.message});
    }
}



export const likePost = async (req , res) => {
    try {

        const {id , userId} = req.query;
        // const {userId} = req.body;

        const post = await Post.findById(id);

        const isLiked = post.likes.get(userId);

        if(isLiked) {
            post.likes.delete(userId);
        }else {
            post.likes.set(userId , true); 
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            {
                likes : post.likes
            },
            {new : true}    
        );

        res.status(200).json(updatedPost);
        
    }catch(err) {
        res.status(405).json({message: err.message});
    }
}



export const addComment = async (req , res) => {
    try {
        const {id , comment} = req.query;

        const updatedPost = await Post.findByIdAndUpdate(id , {
            $push: {comments : comment}
        });

        res.status(200).json(updatedPost)

    } catch (error) {
        res.status(405).json({message: err.message})
    }
}
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import __dirname from "../dirname.js";
import fs from 'fs';

const USER_NOT = 'User does not exist';
const INVALID_CREDENTIALS = 'Invalid credentials!'



export const getUsers = async (req, res) => {
    try {
        const { id } = req.query;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(406).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {

    try {
        const { id } = req.query;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        })


        res.status(200).json({ formattedFriends });
    } catch (err) {
        res.status(405).json({ message: err.message });
    }
}


export const addRemoveFriend = async (req, res) => {

    try {
        const { id, friendId } = req.query;

        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        console.log(friend, user, id, friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id != friendId);
            friend.friends = friend.friends.filter((curId) => curId != id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();


        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        })

        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}




// UPDATE INFO CURRENT USER
export const updateInfoCurrentUser = async (req, res) => {
    try {
        const {
            userId,
            picturePath,
            firstName,
            lastName,
            location,
            occupation
        } = req.body;

        console.log(userId,
            picturePath,
            firstName,
            lastName,
            location, req.body);


        if(picturePath && picturePath != '') { 

            const user = await User.findById(userId);

            console.log(user.picturePath , `${__dirname}/${process.env.ASSETS_IMG}/` );
            
            if(user.picturePath && user.picturePath != '') {
                fs.unlink(`${__dirname}/${process.env.ASSETS_IMG}/${user.picturePath}`, (err) => {
                    if (err) return console.log(err);
                    console.log('File deleted!');
                });
            }


            User.findByIdAndUpdate(userId, {
                firstName: firstName,
                lastName: lastName,
                picturePath : picturePath,
                occupation : occupation,
                location : location
            }, { new: true }).then((user)=> {
                res.status(200).json(user);
            }).catch((err)=> {
                res.status(404).json(err);
            })
        }else {
            User.findByIdAndUpdate(userId, {
                firstName: firstName,
                lastName: lastName,
                occupation : occupation,
                location : location
            }, { new: true }).then((user)=> {
                res.status(200).json(user);
            }).catch((err)=> {
                res.status(404).json(err);
            })
        }

        
    } catch (error) {
        res.status(404).json(error);
    }
}

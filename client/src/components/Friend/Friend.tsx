import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import FlexBetween from "../FlexBetween/FlexBetween";
import UserImage from "../UserImage/UserImage";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { FC, useEffect, useState } from "react";
import { useLazyPatchFriendQuery } from "@/api";
import { User } from "@/models/User";
import { setFriends } from "@/redux/features/authSlice";


interface FriendProps  {
    friendId : string , 
    name : string, 
    subtitle : string, 
    userPicturePath  : string
}


const Friend : FC<FriendProps> = ({friendId , name , subtitle , userPicturePath }) => {
    const [fetchAddOrRemoveFriends , {data , isError}] = useLazyPatchFriendQuery(); 

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const _id = useAppSelector((state) => state.authSlice?.user?._id ?? '');
    const token = useAppSelector((state) => state.authSlice?.token);
    const friends = useAppSelector((state) => state.authSlice?.user?.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.secondary.contrastText;
    const medium = palette.secondary.main;

    // let isFriend = friends?.find((person) => Object.keys(person)[0] == friendId);

    const [isFriend , setIsFriend] = useState(false);

    useEffect(()=> {
        
        setIsFriend((prev) => {
            let getFriendId = friends?.find((person) => person == friendId);
            console.log(isFriend , friendId , friends);
            if(getFriendId == undefined) {
                return false;
            }else {
                return true;
            }
        } )
    } , [friends])


    const patchFriend = async () => {
        let friendList  = await fetchAddOrRemoveFriends({id : _id , friendId : friendId} );
        if(friendList.data) {
            dispatch(setFriends(friendList.data));
        }
    }   



    return (
        <>
            <FlexBetween>
                <FlexBetween gap="1rem">
                    <UserImage img={userPicturePath} size="55px" />
                    <Box
                        onClick={() => {
                            navigate(`/profile/${friendId}`);
                            navigate(0);
                        }}
                    >
                        <Typography
                            color={main}
                            variant="h5"
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography color={medium} fontSize="0.75rem">
                            {subtitle}
                        </Typography>
                    </Box>
                </FlexBetween>
                <IconButton
                    onClick={() => patchFriend()}
                    sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                >
                    {isFriend ? (
                        <PersonRemoveOutlined sx={{ color: primaryDark }} />
                    ) : (
                        <PersonAddOutlined sx={{ color: primaryDark }} />
                    )}
                </IconButton>
            </FlexBetween>
        </>
    )
}


export default Friend;
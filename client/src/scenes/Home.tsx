import { FC } from "react";
import Navbar from "@/scenes/Navbar/Navbar";
import { Box } from "@mui/material";
import UserWidget from "./widgets/UserWidget";
import MyPostWidget from "./widgets/MyPostwidget";
import PostsWidget from "./widgets/PostsWdiget";
import AdvertWidget from "./widgets/AdvertWidget";
import FriendListWidget from "./widgets/FriendListWidget";
import { useAppSelector } from "@/redux/store/hooks";



const HomePage : FC = () => {

    const id = useAppSelector(state => state.authSlice.user?._id ?? '');


    return (
        <Box  >
            <Navbar/>
            <Box padding={'1rem 6%'}  marginY={'25px'} display={'grid'} gridTemplateColumns="400px 1fr 350px" gap="20px"  >
                <UserWidget />
                <Box>
                    <MyPostWidget/>
                    <PostsWidget/>
                </Box>
                <Box>
                    <AdvertWidget  />
                    <FriendListWidget userId={id}/>
                </Box>
            </Box>
        </Box>
    )
}


export default HomePage;
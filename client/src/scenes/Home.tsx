import { FC, useEffect, useState } from "react";
import Navbar from "@/scenes/Navbar/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import UserWidget from "./widgets/UserWidget";
import MyPostWidget from "./widgets/MyPostwidget";
import PostsWidget from "./widgets/PostsWdiget";
import AdvertWidget from "./widgets/AdvertWidget";
import FriendListWidget from "./widgets/FriendListWidget";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { useParams } from "react-router-dom";
import { useIsHaveUser } from "@/hook/useIsHaveUser";
import { setUsers } from "@/redux/features/authSlice";
import { User } from "@/models/User";



const HomePage: FC = () => {

    const { userId } = useParams();
    // const userId = undefined;

    const dispatch = useAppDispatch();

    const [anotherUser, setAnotherUser] = useState<User | undefined>();


    const users = useAppSelector((state) => state.authSlice.users);

    useEffect(() => {
        if(userId == undefined) return;
        setAnotherUser((prev) => {
            let searchUser: User | undefined;

            users.find((user) => {
                if (Object.keys(user)[0] == userId) {
                    searchUser = Object.values(user)[0] as User | undefined;
                }
            });

            return searchUser;
        })
    },)


    useEffect(() => {

        if (userId) {
            dispatch(setUsers({ id: userId, user: anotherUser }));
        }
    }, [userId, anotherUser,])



    const isDesktop = useMediaQuery("(max-width: 1382px)");
    const isMobile = useMediaQuery("(max-width: 950px)");


    return (
        <Box>
            <Navbar />
            <Box padding={ isDesktop ? '1rem 15px' : '1rem 6%'} marginY={'25px'} display={'grid'} gridTemplateColumns={ isMobile ? "1fr" : isDesktop ? '400px 1fr' : "400px 1fr 350px"} gap="20px"  >

                {
                    (isDesktop) && (
                        <>
                            <Box display={'flex'} flexDirection="column" gap={'20px'} marginBottom={isMobile ? '60px' : ''}>
                                <UserWidget idAnotherUser={userId} />
                                <Box>
                                    <AdvertWidget />
                                    <Box marginY={'15px'}></Box>
                                    <FriendListWidget idAntherUser={userId} />
                                </Box>
                            </Box>
                            <Box  >
                                {userId == undefined && <MyPostWidget />}
                                <PostsWidget idAnotherUserId={userId} />
                            </Box>

                        </>
                    )
                }

                {
                    (isDesktop == false) && (
                        <>
                            <UserWidget idAnotherUser={userId} />
                            <Box >
                                {userId == undefined && <MyPostWidget />}
                                <PostsWidget idAnotherUserId={userId} />
                            </Box>
                            <Box>
                                <AdvertWidget />
                                <Box marginY={'15px'}></Box>
                                <FriendListWidget idAntherUser={userId} />
                            </Box>
                        </>
                    )
                }






            </Box>
        </Box>
    )
}


export default HomePage;
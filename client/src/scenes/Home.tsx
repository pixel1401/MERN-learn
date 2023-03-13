import { FC } from "react";
import Navbar from "@/scenes/Navbar/Navbar";
import { Box } from "@mui/material";
import UserWidget from "./widgets/UserWidget";
import MyPostWidget from "./widgets/MyPostwidget";



const HomePage : FC = () => {
    return (
        <Box  >
            <Navbar/>
            <Box padding={'1rem 6%'}  marginY={'25px'} display={'grid'} gridTemplateColumns="400px 1fr 350px" gap="20px"  >
                <UserWidget />
                <MyPostWidget/>
                <MyPostWidget/>
            </Box>
        </Box>
    )
}


export default HomePage;
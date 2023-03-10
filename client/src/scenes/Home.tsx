import { FC } from "react";
import Navbar from "@/scenes/Navbar/Navbar";
import { Box } from "@mui/material";
import UserWidget from "./widgets/UserWidget";



const HomePage : FC = () => {
    return (
        <Box>
            <Navbar/>

            <UserWidget />
        </Box>
    )
}


export default HomePage;
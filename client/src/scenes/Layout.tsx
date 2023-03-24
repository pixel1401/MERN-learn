import { Box } from "@mui/system";
import { FC } from "react"
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";



const Layout : FC = () => {
    return (
        <>
            <Box>
                <Navbar/>
                <Outlet />
            </Box>
        </>
    )
};


export default Layout;
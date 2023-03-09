import { Box, Button, InputBase, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import Form from "./Form";



const LoginPage: FC = () => {

    const theme = useTheme();
    const secondaryLight = theme.palette.secondary.light;
    const dark = theme.palette.secondary.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.paper;

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");    

    return (
        <Box>
            <Box
                width="100%"
                bgcolor={theme.palette.background.paper}
                p="1rem 6%"
                textAlign="center"
            >
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    Sociopedia
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                bgcolor={theme.palette.background.paper}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Welcome to Socipedia, the Social Media for Sociopaths!
                </Typography>
                <Form />
            </Box>
        </Box>
    )
}


export default LoginPage;
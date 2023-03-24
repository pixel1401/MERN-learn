import RobotoGif from "@/assets/robot.gif";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

interface WelcomeChatProps {
    userName : string
} 


const WelcomeChat : FC<WelcomeChatProps> = ({userName}) => {
    return (
        <>
            <Box display={'flex'} width='100%' flexDirection="column" alignItems="center" justifyContent={'center'} >
                <img src={RobotoGif} alt="RobotoGif" />
                <Typography fontWeight={'800'} fontSize="32" color={'primary'} >
                    Welcome, <span>{userName}!</span>
                </Typography>
                <Typography fontWeight={'500'} fontSize="25" color={'primary'}>Please select a chat to Start messaging.</Typography>
            </Box>
        </>
    )
};

export default WelcomeChat;
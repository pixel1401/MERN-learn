import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";


interface MessageItemProps {
    isAnother: boolean,
    message: string,
    data: string
}

const MessageItem: FC<MessageItemProps> = ({ isAnother, message, data }) => {

    const theme = useTheme();

    const { main: mainColor, light: lightColor } = theme.palette.primary;

    return (
        <>
            <Box alignSelf={isAnother ? 'flex-start' : 'flex-end'} padding={'2px 8px'} bgcolor={ isAnother ? lightColor : mainColor} width={'fit-content'} marginTop="10px" borderRadius="3px">
                <Typography>
                    {message}
                </Typography>
            </Box>
        </>
    )
}


export default MessageItem;
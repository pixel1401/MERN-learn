import * as React from 'react';
import { io } from "socket.io-client";
import { useTheme, } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DrawerBox, { DrawerHeader } from '@/components/Drawer/Drawer';
import { FormControl, Grid, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FlexBetween from '@/components/FlexBetween/FlexBetween';
import MessageItem from '@/components/MessageItem/MessageItem';
import UserImage from '@/components/UserImage/UserImage';
import { useAppSelector } from '@/redux/store/hooks';
import { User } from '@/models/User';
import { useLazyGetMessagesQuery, useLazySetMessagesQuery } from '@/api';
import { useEffect, useRef } from 'react';







export default function ChatPage() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const alt = theme.palette.background.paper;

    const socket = useRef();

    
    const friends = useAppSelector((state) => state.authSlice.friends);
    const user = useAppSelector((state) => state.authSlice.user);

    const [fetchGetMessages , {data : messages , isError}] = useLazyGetMessagesQuery();
    const [fetchSetMessage , ] = useLazySetMessagesQuery();


    const [interlocutor ,setInterlocutor ] = React.useState<User | undefined>();


    const [message, setMessage] = React.useState('');


    useEffect(() => {
        // if (interlocutor) {
        //   socket.current = io(host);
        //   socket.current.emit("add-user", currentUser._id);
        // }
      }, [interlocutor]);





    const sendMessage = () => { 

    }

    return (
        <Box sx={{ display: 'flex' }} bgcolor={alt}>
            <DrawerBox open={open} handleDrawer={setOpen}  friends={friends ?? []} interlocutor={interlocutor} setInterlocutor={setInterlocutor} />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader sx={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}>
                    <UserImage size={'30px'} />
                </DrawerHeader>

                <Box display={'flex'} flexDirection="column" >
                    <MessageItem isAnother={true} message={'Hello'} data='5 min' />
                    <MessageItem isAnother={false} message={'Hello'} data='5 min' />
                </Box>

                <FlexBetween marginTop={'15px'}>
                    <FormControl fullWidth>
                        <TextField onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            label="Type your message..."
                            variant="outlined" />
                    </FormControl>
                    <IconButton onClick={sendMessage}
                        aria-label="send"
                        color="primary">
                        <SendIcon />
                    </IconButton>
                </FlexBetween>
            </Box>
        </Box>
    );
}
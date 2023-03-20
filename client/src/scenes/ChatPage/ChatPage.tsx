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
import { mainApi } from '@/const';
import { Messages } from '@/models/Messages';







export default function ChatPage() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const alt = theme.palette.background.paper;

    const socket = useRef<any>();

    
    const friends = useAppSelector((state) => state.authSlice.friends);
    const user = useAppSelector((state) => state.authSlice.user);

    const [fetchGetMessages , {data : messages , isError}] = useLazyGetMessagesQuery();
    const [fetchSetMessage , ] = useLazySetMessagesQuery();


    const [interlocutor ,setInterlocutor ] = React.useState<User | undefined>();


    const [message, setMessage] = React.useState('');


    const [dialog , setDialog] = React.useState<Messages[]>([]);


    useEffect(() => {
        if (interlocutor) {
          socket.current = io(mainApi);
          socket.current.emit("add-user", interlocutor._id);
            console.log('WORK');
            
        }
    }, [interlocutor]);





    const getCurrentChat = async ( anotherUser : User ) => {
        let data = await fetchGetMessages({from : user?._id ?? '' , to : anotherUser._id});
        if(data.data) {
            setDialog(prev => {
                let dialogs : Messages[] = [];
                for(let a of  data.data) {
                    dialogs.push({message : a.message , isAnother: a.fromSelf == true ? false : true})
                }

                return [...prev , ...dialogs];
                
            })
        }

    }

    useEffect(() => {
        if(interlocutor) {
            getCurrentChat(interlocutor);
        }
    }, [interlocutor])



    useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg : any) => {
            console.log(msg);
            
            setDialog(prev => {
                return [...prev , {isAnother : true , message : msg }]
            })
          });
        }
      }, []);




    const sendMessage = async () => { 
        if(!interlocutor ) return;
        const currentMessage : Messages = {message : message  , isAnother : false } 
        setDialog(prev => {
            return [...prev , currentMessage]
        }),

        socket.current.emit("send-msg", {
            to: interlocutor?._id,
            from: user?._id ?? '',
            msg :message ,
        });

        let data = await fetchSetMessage({to: interlocutor?._id,
            from: user?._id ?? '',
            message :message ,
        
        })
        console.log(data.data);
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
                    {...dialog.map((message) => {
                        return (
                            <MessageItem isAnother={message.isAnother} message={message.message}  />
                        )
                    })}
                </Box>

                <FlexBetween marginTop={'15px'}>
                    <FormControl fullWidth>
                        <TextField onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            label="Type your message..."
                            variant="outlined" />
                    </FormControl>
                    <IconButton onClick={() => sendMessage()}
                        aria-label="send"
                        color="primary">
                        <SendIcon />
                    </IconButton>
                </FlexBetween>
            </Box>
        </Box>
    );
}
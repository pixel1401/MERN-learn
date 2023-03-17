import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { User } from '@/models/User';
import UserImage from '../UserImage/UserImage';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));




const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        // background : theme.palette.primary.main,
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),

        '& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper' : {
            background : theme.palette.background.paper,
        }
    }),
);




interface DrawerBoxProps {
    open: boolean
    handleDrawer: (value: boolean) => void,
    friends : User[],
    interlocutor? : User,
    setInterlocutor : ( user : User ) => void
}

const DrawerBox: React.FC<DrawerBoxProps> = ({ open, handleDrawer , friends , interlocutor , setInterlocutor }) => {

    const theme = useTheme();
    const alt = theme.palette.background.paper;

    const mainColor = theme.palette.primary.main;

    const handleDrawerOpen = () => {
        handleDrawer(true);
    };

    const handleDrawerClose = () => {
        handleDrawer(false);
    };


    

    return (
        <>
            <Drawer variant="permanent" open={open} sx={{
                bgcolor: 'red !important'
            }}>
                <DrawerHeader>
                    <IconButton >
                        {open ? <ChevronLeftIcon onClick={handleDrawerClose} /> : <ChevronRightIcon onClick={handleDrawerOpen} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {friends.map((user, index) => (
                        <ListItem key={user._id}  onClick={() => setInterlocutor(user)}  disablePadding sx={{ display: 'block' , backgroundColor: interlocutor != undefined && interlocutor._id ==  user._id ? mainColor : ''  }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <UserImage img={user.picturePath} size={'20px'}  />
                                </ListItemIcon>
                                <ListItemText primary={user.firstName} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}


export default DrawerBox;
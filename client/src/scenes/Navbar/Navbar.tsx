import { Box, FormControl, IconButton, InputBase, MenuItem, Select, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "@/components/FlexBetween/FlexBetween";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
} from "@mui/icons-material";
import { setLogout, setMode } from "@/redux/features/authSlice";



const Navbar: FC = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const secondaryLight = theme.palette.secondary.light;
    const dark = theme.palette.secondary.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.paper;

    const fullName = `Erzhan`;

    return (
        <>
            <FlexBetween padding={'1rem 6%'} bgcolor={alt} >
                <FlexBetween>
                    <Typography
                        fontSize={"clamp(1rem , 2rem , 2.25rem)"}
                        marginRight={'10px'}
                        color="primary"
                        sx={{
                            "&:hover": {
                                color: primaryLight,
                                cursor: 'pointer'
                            }
                        }}
                    >
                        Media
                    </Typography>
                    {isNonMobileScreens && (
                        <FlexBetween bgcolor={secondaryLight} borderRadius='9px' gap={'3rem'} padding="0.1rem 1.5rem">
                            <InputBase placeholder="Search..." />
                            <IconButton>
                                <Search />
                            </IconButton>
                        </FlexBetween>
                    )}
                </FlexBetween>

                {/* DESKTOP NAV */}
                {isNonMobileScreens
                    ? (<FlexBetween gap={'2rem'}>
                        <IconButton onClick={() => dispatch(setMode())}>
                            {
                                theme.palette.mode === 'dark'
                                    ? (<DarkMode sx={{
                                        fontSize: '25px'
                                    }} />)
                                    : (<LightMode sx={{
                                        fontSize: '25px',
                                        color: dark
                                    }}
                                    />)
                            }
                        </IconButton>
                        <Message sx={{ fontSize: '25px' }}  onClick={() => navigate('/chat') } />
                        <Notifications sx={{ fontSize: '25px' }} />
                        <Help sx={{ fontSize: '25px' }} />
                        <FormControl variant="standard"  >
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: secondaryLight,
                                    width: '150px',
                                    borderRadius: '0.25rem',
                                    p: '0.25rem 1rem',
                                    "& .MuiSvgIcon-root": {
                                        pr: '0.25rem',
                                        width: '3rem'
                                    },
                                    "& . MuiSelect-select:focus": {
                                        backgroundColor: secondaryLight
                                    }
                                }}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())} >Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>)
                    : (<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                        <Menu />
                    </IconButton>)
                }

                {/* MOBILE NAV */}
                {!isNonMobileScreens && isMobileMenuToggled && (
                    <Box
                        position={'fixed'}
                        zIndex="10"
                        right='0'
                        bottom='0'
                        height={'100%'}
                        minWidth="200px"
                        maxWidth='500px'
                        bgcolor={background}
                    >
                        {/* CLOSE ICON */}
                        <Box display={'flex'} justifyContent="flex-end" p={'1rem'} >
                            <IconButton
                                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                            >
                                <Close />
                            </IconButton>
                        </Box>

                        {/* MENU ITEMS */}
                        <FlexBetween
                            flexDirection={'column'}
                            justifyContent='center'
                            alignContent={'center'}
                            gap='3rem'
                            bgcolor={alt}
                            paddingBottom='20px'
                        >
                            <IconButton onClick={() => dispatch(setMode())}>
                                {
                                    theme.palette.mode === 'dark'
                                        ? (<DarkMode sx={{
                                            fontSize: '25px'
                                        }} />)
                                        : (<LightMode sx={{
                                            fontSize: '25px',
                                            color: dark
                                        }}
                                        />)
                                }
                            </IconButton>
                            <Message sx={{ fontSize: '25px' }} />
                            <Notifications sx={{ fontSize: '25px' }} />
                            <Help sx={{ fontSize: '25px' }} />
                            <FormControl variant="standard"  >
                                <Select
                                    value={fullName}
                                    sx={{
                                        backgroundColor: secondaryLight,
                                        width: '150px',
                                        borderRadius: '0.25rem',
                                        p: '0.25rem 1rem',
                                        "& .MuiSvgIcon-root": {
                                            pr: '0.25rem',
                                            width: '3rem'
                                        },
                                        "& . MuiSelect-select:focus": {
                                            backgroundColor: secondaryLight
                                        }
                                    }}
                                >
                                    <MenuItem value={fullName}>
                                        <Typography>{fullName}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => dispatch(setLogout())} >Log Out</MenuItem>
                                </Select>
                            </FormControl>
                        </FlexBetween>

                    </Box>
                )}


            </FlexBetween>
        </>
    )
}

export default Navbar;
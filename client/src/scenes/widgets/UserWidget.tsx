import FlexBetween from "@/components/FlexBetween/FlexBetween";
import UserImage from "@/components/UserImage/UserImage";
import WidgetWrapper from "@/components/WidgetWrapper/WidgetWrapper";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react"
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import LinkedInIcon from '@mui/icons-material/LinkedIn';
  import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/store/hooks";

const UserWidget : FC = ()=> {


    const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useAppSelector(state => state.authSlice.token);
  const dark = palette.secondary.dark;
  const medium = palette.secondary.contrastText;
  const main = palette.secondary.main;




    const CustomDivider = () => {
        return (
            <>
                <Divider sx={{
                    marginY: '15px'
                }}/>
            </>
        )
    }


    return (
        <>
            <WidgetWrapper>
                <FlexBetween>
                    <UserImage   />
                    <Box  marginX={'10px'} flex={'1 1 auto '} display={'flex'} flexDirection="column" justifyContent={'flex-start'}  alignContent={'flex-start'} gap={'5px'} >
                        <Typography 
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                '&:hover' : {
                                    color : palette.primary.light,
                                    cursor: 'pointer'
                                }
                            }}
                        >Fake Peson</Typography>
                        <Typography color={medium} >0 friends</Typography>
                    </Box>
                    <ManageAccountsOutlined/>
                </FlexBetween>

                <CustomDivider/>

                <Box display={'flex'} flexDirection="column" gap={'10px'} justifyContent={'center'} >
                    <Box display={'flex'} gap={'10px'} >
                        <LocationOnOutlined fontSize="large" sx={{ color: main }}/>
                        <Typography color={medium} >Location</Typography>
                    </Box>
                    <Box display={'flex'} gap={'10px'} >
                        <WorkOutlineOutlined fontSize="large" sx={{ color: main }}/>
                        <Typography color={medium}>Occupation</Typography>
                    </Box>
                </Box>

                <CustomDivider/>

                <Box display={'flex'} flexDirection="column" gap={'10px'} justifyContent={'center'}  >
                    <Box display={'flex'} gap={'10px'} justifyContent="space-between" >
                        <Typography color={medium} >Who's viewed your profile</Typography>
                        <Typography color={main} fontWeight="500" >50</Typography>
                    </Box>
                    <Box display={'flex'} gap={'10px'} justifyContent="space-between" >
                        <Typography color={medium} >Impressions of your post</Typography>
                        <Typography color={main} fontWeight="500" >870</Typography>
                    </Box>
                </Box> 

                <CustomDivider/>

                <Typography fontSize={'1rem'} color={main} fontWeight='500' mb={'1rem'} >Social Profiles</Typography>
                <Box display={'flex'} flexDirection="column" gap={'15px'} >
                    <FlexBetween>
                        <TwitterIcon/>
                        <Box display={'flex'} flex="1 1 auto" marginX={'15px'} flexDirection="column"  >
                            <Typography color={main} fontWeight='500' >Twitter</Typography>
                            <Typography color={medium} >Social Network</Typography>
                        </Box>
                        <EditOutlined sx={{ color: main }}/>
                    </FlexBetween>
                    <FlexBetween>
                        <LinkedInIcon/>
                        <Box display={'flex'} flex="1 1 auto" marginX={'15px'} flexDirection="column"  >
                            <Typography color={main} fontWeight='500'  >Twitter</Typography>
                            <Typography color={medium} >Social Network</Typography>
                        </Box>
                        <EditOutlined sx={{ color: main }}/>
                    </FlexBetween>
                </Box>

            </WidgetWrapper>
        </>
    )
}


export default UserWidget;
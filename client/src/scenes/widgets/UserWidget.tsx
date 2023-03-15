import FlexBetween from "@/components/FlexBetween/FlexBetween";
import UserImage from "@/components/UserImage/UserImage";
import WidgetWrapper from "@/components/WidgetWrapper/WidgetWrapper";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react"
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { useGetUserInfoQuery } from "@/api";
import {setUser as setUserDispatch, setUsers} from "@/redux/features/authSlice";
import { User } from "@/models/User";


interface UserWidget {
    idAnotherUser? : string
    anotherUserInfo? : User
}

const UserWidget: FC<UserWidget> = ({idAnotherUser , anotherUserInfo}) => {
    
    const [user, setUser] = useState(null);
    const dispatch = useAppDispatch();
    const { palette } = useTheme();
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.authSlice.user?._id ?? '');
    const dark = palette.secondary.dark;
    const medium = palette.secondary.contrastText;
    const main = palette.secondary.main;
    
    const {data : userInfo , error } = useGetUserInfoQuery( ( idAnotherUser ?? userId ?? '').toString()   , {
        skip :    (userId == null || userId == '') 
    });
    

    useEffect(()=> {
        if(userInfo && idAnotherUser == undefined) {
            dispatch(setUserDispatch(userInfo))
        }else if (userInfo && idAnotherUser) {
            dispatch(setUsers({id : idAnotherUser , user : userInfo}))
        }

    } , [userInfo])

   

    const CustomDivider = () => {
        return (
            <>
                <Divider sx={{
                    marginY: '15px'
                }} />
            </>
        )
    }


    return (
        <>
            <WidgetWrapper>
                <FlexBetween>
                    <UserImage img={userInfo?.picturePath} />
                    <Box marginX={'10px'} flex={'1 1 auto '} display={'flex'} flexDirection="column" justifyContent={'flex-start'} alignContent={'flex-start'} gap={'5px'} >
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                '&:hover': {
                                    color: palette.primary.light,
                                    cursor: 'pointer'
                                }
                            }}
                        >{userInfo?.firstName} {userInfo?.lastName}</Typography>
                        <Typography color={medium} >{userInfo?.friends.length} friends</Typography>
                    </Box>
                    <ManageAccountsOutlined />
                </FlexBetween>

                <CustomDivider />

                <Box display={'flex'} flexDirection="column" gap={'10px'} justifyContent={'center'} >
                    <Box display={'flex'} alignItems="center"  gap={'10px'} >
                        <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                        <Typography color={medium} > {userInfo?.location}</Typography>
                    </Box>
                    <Box display={'flex'} alignItems="center" gap={'10px'} >
                        <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                        <Typography color={medium}>{userInfo?.occupation}</Typography>
                    </Box>
                </Box>

                <CustomDivider />

                <Box display={'flex'} flexDirection="column" gap={'10px'} justifyContent={'center'}  >
                    <Box display={'flex'} gap={'10px'} justifyContent="space-between" >
                        <Typography color={medium} >Who's viewed your profile</Typography>
                        <Typography color={main} fontWeight="500" >{userInfo?.viewedProfile}</Typography>
                    </Box>
                    <Box display={'flex'} gap={'10px'} justifyContent="space-between" >
                        <Typography color={medium} >Impressions of your post</Typography>
                        <Typography color={main} fontWeight="500" >{userInfo?.impressions}</Typography>
                    </Box>
                </Box>

                <CustomDivider />

                <Typography fontSize={'1rem'} color={main} fontWeight='500' mb={'1rem'} >Social Profiles</Typography>
                <Box display={'flex'} flexDirection="column" gap={'15px'} >
                    <FlexBetween>
                        <TwitterIcon />
                        <Box display={'flex'} flex="1 1 auto" marginX={'15px'} flexDirection="column"  >
                            <Typography color={main} fontWeight='500' >Twitter</Typography>
                            <Typography color={medium} >Social Network</Typography>
                        </Box>
                        <EditOutlined sx={{ color: main }} />
                    </FlexBetween>
                    <FlexBetween>
                        <LinkedInIcon />
                        <Box display={'flex'} flex="1 1 auto" marginX={'15px'} flexDirection="column"  >
                            <Typography color={main} fontWeight='500'  >Twitter</Typography>
                            <Typography color={medium} >Social Network</Typography>
                        </Box>
                        <EditOutlined sx={{ color: main }} />
                    </FlexBetween>
                </Box>
            </WidgetWrapper>
        </>
    )
}


export default UserWidget;
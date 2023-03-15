import { useGetFriendsQuery } from "@/api";
import Friend from "@/components/Friend/Friend";
import WidgetWrapper from "@/components/WidgetWrapper/WidgetWrapper"
import { User } from "@/models/User";
import { setFriends } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { Typography, Box, useTheme } from "@mui/material"
import { FC, useEffect, useState } from "react";



interface FriendListWidgetProps {
    idAntherUser? : string
}

const FriendListWidget: FC<FriendListWidgetProps> = ({idAntherUser}) => {

    const dispatch = useAppDispatch();
    const { palette } = useTheme();
    const userId = useAppSelector(state => state.authSlice.user?._id ?? '');
    const friends = useAppSelector((state) => state.authSlice?.friends ?? []);


    const { data } = useGetFriendsQuery(idAntherUser ??  userId, { skip:  userId == '' });


    useEffect(() => {
        if (data) {
            dispatch(setFriends(data.formattedFriends));
        }
    }, [data])


    return (
        <>
            <WidgetWrapper>
                <Typography
                    color={palette.secondary.dark}
                    variant="h5"
                    fontWeight="500"
                    sx={{ mb: "1.5rem" }}
                >
                    Friend List
                </Typography>
                <Box display="flex" flexDirection="column" gap="1.5rem">
                    {friends.map((friend) => (
                        <Friend
                            key={friend._id}
                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.occupation}
                            userPicturePath={friend.picturePath}
                        />
                    ))}
                </Box>
            </WidgetWrapper>
        </>
    )
}


export default FriendListWidget;



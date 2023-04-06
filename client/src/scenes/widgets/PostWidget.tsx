import { BASE_URL, useLazyPatchLikeQuery , useLazyPatchCommentQuery } from "@/api";
import FlexBetween from "@/components/FlexBetween/FlexBetween"
import Friend from "@/components/Friend/Friend";
import WidgetWrapper from "@/components/WidgetWrapper/WidgetWrapper"
import { Post } from "@/models/Post";
import { addComment, patchLikePost , } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider, IconButton, TextField, Typography, useTheme } from "@mui/material"
import { FC, FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify";



interface PostWidgetProps {
    post: Post
}

const PostWidget: FC<PostWidgetProps> = ({ post }) => {
    const [fetchPatchLike, { data }] = useLazyPatchLikeQuery();

    const [isComments, setIsComments] = useState(false);
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.authSlice.token);
    const loggedInUserId = useAppSelector((state) => state.authSlice.user?._id ?? '');
    const isLiked = Boolean(post.likes[loggedInUserId]);
    const likeCount = Object.keys(post.likes).length;


    const [comment, setComment] = useState('');
    const [fetchPatchComment] = useLazyPatchCommentQuery();



    const { palette } = useTheme();
    const main = palette.secondary.contrastText;
    const primary = palette.primary.main;


    const patchLike = async () => {
        let data = await fetchPatchLike({ id: post._id, userId: loggedInUserId });
        if (data.data) {
            dispatch(patchLikePost(data.data))
        }
    }


    const sendComment = async (e : FormEvent)=> {
        e.preventDefault();
        dispatch(addComment({id : post._id , comment : comment}));
        setComment('');

        const idToast = toast.loading("Please wait...")

        let data = await fetchPatchComment({id : post._id , comment : comment});
        
        if(data.data) {
            toast.update(idToast, { render: "Post uploaded", type: "success", isLoading: false  , autoClose: 2000});
        }else {
            toast.update(idToast, { render: "Error", type: "error", isLoading: false , autoClose: 2000,  });
        }
    }


    return (
        <>
            <WidgetWrapper m="2rem 0">
                <Friend
                    friendId={post.userId}
                    name={`${post.firstName} ${post.lastName}`}
                    subtitle={post.location}
                    userPicturePath={post.userPicturePath}
                />
                <Typography color={main} sx={{ mt: "1rem" }}>
                    {post.description}
                </Typography>
                {post.picturePath && (
                    <img
                        width="100%"
                        height="auto"
                        alt="post"
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                        src={`${BASE_URL}/assets/img/${post.picturePath}`}
                    />
                )}
                {
                    post.audioPath && (
                        <Box display={'flex'} justifyContent={'center'} marginTop={'10px'}>
                            <audio
                                controls
                                src={`${BASE_URL}/assets/audio/${post.audioPath}`}>
                                <a href={`${BASE_URL}/assets/audio/${post.audioPath}`}>
                                </a>
                            </audio>
                        </Box>

                    )
                }
                <FlexBetween mt="0.25rem">
                    <FlexBetween gap="1rem">
                        <FlexBetween gap="0.3rem">
                            <IconButton onClick={patchLike}>
                                {isLiked ? (
                                    <FavoriteOutlined sx={{ color: primary }} />
                                ) : (
                                    <FavoriteBorderOutlined />
                                )}
                            </IconButton>
                            <Typography>{likeCount}</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.3rem">
                            <IconButton onClick={() => setIsComments(!isComments)}>
                                <ChatBubbleOutlineOutlined />
                            </IconButton>
                            <Typography>{post.comments.length}</Typography>
                        </FlexBetween>
                    </FlexBetween>

                    <IconButton>
                        <ShareOutlined />
                    </IconButton>
                </FlexBetween>
                {isComments && (
                    <Box mt="0.5rem">
                        {post.comments.map((comment, i) => (
                            <Box key={`${comment}-${i}`}>
                                <Divider />
                                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))}
                        <Divider />
                        <form onSubmit={sendComment}>
                            <FlexBetween gap="5px">
                                <TextField
                                    required={true}
                                    label="Send Message"
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    name="message"
                                    sx={{
                                        flex : '1 1 auto'
                                    }}
                                />
                                <Button
                                    type="submit"
                                    sx={{
                                        color: palette.background.paper,
                                        backgroundColor: palette.primary.main,
                                        height: '52px'
                                    }}
                                >
                                    Send
                                </Button>
                            </FlexBetween>
                        </form>


                    </Box>
                )}
            </WidgetWrapper>
        </>
    )





}



export default PostWidget;
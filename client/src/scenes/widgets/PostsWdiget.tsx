import { useGetPostsQuery } from "@/api";
import { setPosts } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { FC, useEffect } from "react";
import PostWidget from "./PostWidget";




const PostsWidget : FC = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.authSlice.posts);
    const {data , isLoading , isError} = useGetPostsQuery(null);

    useEffect(()=> {
        if(data) {
            dispatch(setPosts(data));
        }
    }, [data])
    

    
    if(posts) {
        return (
            <>
                {...posts.map((post) => {
                    return <PostWidget post={post}/>
                })}
            </>
        );
    }else {
        return (
            <>
            </>
        )
    }

    
}



export default PostsWidget;
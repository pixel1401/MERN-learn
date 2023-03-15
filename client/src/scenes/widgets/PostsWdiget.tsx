import { useGetPostsQuery, useGetPostsUserQuery } from "@/api";
import { setPosts } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { FC, useEffect } from "react";
import PostWidget from "./PostWidget";


interface PostsWidgetProps {
    idAnotherUserId? : string
}

const PostsWidget : FC<PostsWidgetProps> = ({idAnotherUserId }) => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.authSlice.posts);
    const userId = useAppSelector((state)=> state.authSlice.user?._id ?? '');


    const {data , isLoading , isError} = useGetPostsQuery(null , {
        skip: idAnotherUserId != undefined
    });
    const {data : anotherPosts} = useGetPostsUserQuery(idAnotherUserId ?? '' , {
        skip:  idAnotherUserId == undefined
    })

    useEffect(()=> {  
        if(data && idAnotherUserId == undefined ) {
            dispatch(setPosts(data));
        }else if(anotherPosts && idAnotherUserId != undefined ) {
            dispatch(setPosts(anotherPosts));
        }
    }, [data , anotherPosts])
    

    
    if(posts) {
        return (
            <>
                {...posts.map((post) => {
                    return <PostWidget key={post._id} post={post}/>
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
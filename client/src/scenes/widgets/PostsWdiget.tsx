import { useGetPostsQuery } from "@/api";
import { FC } from "react";




const PostsWidget : FC = () => {

    const {data , isLoading} = useGetPostsQuery(null);


    return (
        <>
            
        </>
    );
}



export default PostsWidget;
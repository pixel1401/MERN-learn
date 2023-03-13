import { User } from "@/models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface InitialState {
    mode : "light" | "dark",
    user : null | User ,
    token : null | String,
    posts : []
}



const initialState : InitialState = {
    mode : "light",
    user:null,
    token : null ,
    posts : []
}


export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setMode : (state)=> {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setUser : (state , action : PayloadAction<User>) => {
            state.user = action.payload;
        },
        setLogin : (state , action : PayloadAction<Pick<InitialState , 'user' | 'token'>>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        setLogout : (state ) => {
            state.token = null;
            state.user = null;
        },
        setFriends : (state , action : PayloadAction<[]>) => {
            // state.user.friends = action.payload.friends
        },
        setPosts : (state , action: PayloadAction<Pick<InitialState , 'posts'>>) => {
            state.posts = action.payload.posts;
        },
        setPost : (state , action: PayloadAction<[]>) => {
            // const updatePosts = state.posts.map(post => {
            //     if(post._id == action.payload.posts._id) return action.payload.posts;
            //     return post;
            // });

            // state.posts = updatePosts;
        }

    }
})

export const {setMode , setUser , setLogin , setLogout , setFriends , setPosts , setPost} = authSlice.actions;
export default authSlice.reducer;
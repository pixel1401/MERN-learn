import { Post } from "@/models/Post";
import { User } from "@/models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface InitialState {
    mode : "light" | "dark",
    user : null | User ,
    token : null | String,
    posts : Post[] | null,
    friends : User[] | null
}



const initialState : InitialState = {
    mode : "light",
    user:null,
    token : null ,
    posts : [],
    friends: null
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
        setFriends : (state , action : PayloadAction<User[]>) => {
                state.friends = action.payload;
                if(state.user) {
                    let friends : String[]  = [];   
                     action.payload.map((friend) => {
                        friends.push(friend._id);
                        return friend 
                    });
                    state.user.friends = friends;
                }
        },
        setPosts : (state , action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        setPost : (state , action: PayloadAction<Post>) => {
            if(state.posts == null) return;
            const updatePosts = state.posts?.map(post => {
                if(post._id == action.payload._id) return action.payload;
                return post;
            });
            state.posts = updatePosts;  
        },

        patchLikePost: (state , action : PayloadAction<Post>) => {
            if(state.posts == null) return;
            state.posts = state.posts.map((post ) => {
                if(post._id == action.payload._id) {
                    return action.payload;
                }
                return post;
            })
        }

    }
})

export const {setMode , setUser , setLogin , setLogout , setFriends , setPosts , setPost , patchLikePost} = authSlice.actions;
export default authSlice.reducer;
import { Post } from "@/models/Post";
import { User } from "@/models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface InitialState {
    mode : "light" | "dark",
    user : null | User ,
    token : null | String,
    posts : Post[] | null,
    friends : User[] | null,
    users: Users[] 
}


interface Users {
    [key: string]: User | undefined;
}



const initialState : InitialState = {
    mode : "light",
    user:null,
    token : null ,
    posts : [],
    friends: null,
    users: []
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

        setUsers : (state , action: PayloadAction<{id? : string , user?: User}>) => {
            if(action.payload.id && action.payload.user) {
                state.users = state.users.map((user) => {
                        
                    if(Object.keys(user)[0] === action.payload.id) {
                        user[`${action.payload.id}`] = action.payload.user;
                        // Object.values(user)[0] = action.payload.user;
                    }
                    return user;
                });
                return;
            }

            
            if(action.payload.id) {
                for(let a of state.users) {
                    if(Object.keys(a)[0] == action.payload.id) {
                        return;
                    }
                }
                state.users.push({
                    [`${action.payload.id}`] : undefined
                })
                return;
            }
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
            console.log(action.payload);
            
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

export const {setMode , setUser , setUsers , setLogin , setLogout , setFriends , setPosts , setPost , patchLikePost} = authSlice.actions;
export default authSlice.reducer;
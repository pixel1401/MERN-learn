import { Post } from '@/models/Post'
import { FriendsData, LoginData, User } from '@/models/User'
import { useAppSelector } from '@/redux/store/hooks'
import { RootState } from '@/redux/store/store'
import { InitialValuesLogin } from '@/scenes/LoginPage/Form'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const BASE_URL = 'http://localhost:3001';
// https://mern-learn.onrender.com
// http://localhost:3001

export const mainApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL ,
    
    prepareHeaders:  (headers , {getState}) => {
        const token  = (getState() as RootState ).authSlice.token ?? '';
        headers.set('Authorization', `Bearer ${token}`);
        return headers;
        
    },
    
    
}),
    keepUnusedDataFor: 0,
    endpoints: (build) => ({

        login: build.query<LoginData, InitialValuesLogin>({
            query(post) {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: post,
                }
            },
        }),

        register : build.query<any, FormData>({
            query(post) {
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body: post,
                }
            },
        }),

        getUserInfo : build.query<User, string>({
            query(userId) {
                return {
                    url: '/users/getUser',
                    method: 'GET',
                    params : {
                        id : userId
                    }
                }
            },
        }),

        getFriends : build.query<FriendsData, string>({
            query(userId) {
                return {
                    url: '/users/getFriends',
                    method: 'GET',
                    params : {
                        id : userId
                    }
                }
            },
        }),


        getPosts : build.query<Post[] , null>({
            query() {
                return {
                    url: '/posts',
                    method: 'GET',
                }
            },
        }),

        getPostsUser : build.query<Post[] , string>({
            query(userId) {
                return {
                    url: '/posts/getPostsUser',
                    method: 'GET',
                    params: {
                        userId
                    }
                }
            },
        }),

        setPost : build.query<Post[] , FormData>({
            query(post) {
                return {
                    url: '/posts',
                    method: 'POST',
                    body : post
                }
            },
        }),



        patchLike : build.query<Post , {id : string , userId : string}>({
            query({id , userId}) {
                return {
                    url: '/posts/likePost',
                    method: 'PATCH',
                    params : {
                        id , userId
                    }
                }
            },
        }),

        patchComment : build.query<Post , {id : string , comment : string}>({
            query({id , comment}) {
                return {
                    url: '/posts/addComment',
                    method: 'PATCH',
                    params : {
                        id , comment
                    }
                }
            },
        }),

        patchFriend : build.query<User[] , {id : string , friendId : string }>({
            query({id , friendId}) {
                return {
                    url: '/users/patchFriend',
                    method: 'PATCH',
                    params : {
                        id : id,
                        friendId : friendId
                    }
                }
            },
        }),



        // ! MESSAGES
        getMessages: build.query<any , {from : string , to : string }>({
            query({from , to}) {
                return {
                    url: '/messages/getmsg',
                    method: 'POST',
                    body : {
                        from,
                        to
                    }
                }
            },
        }),

        setMessages : build.query<any , {from : string , to : string , message : string }>({
            query({from , to , message}) {
                return {
                    url: '/messages/addmsg',
                    method: 'POST',
                    body : {
                        from,
                        to ,
                        message
                    }
                }
            },
        }),


        // ! UPDATE USER CURRENT INFO
        updateCurrentUserInfo  : build.query<any , FormData>({
            query(formData) {
                return {
                    url: '/userInfo',
                    method: 'POST',
                    body : formData
                }
            },
        })
        

    }),
})


export const {useLazyLoginQuery , useLazyRegisterQuery , 
        useGetUserInfoQuery ,  useGetFriendsQuery ,

        useGetPostsQuery, useGetPostsUserQuery  ,useLazySetPostQuery,
        useLazyPatchLikeQuery , useLazyPatchFriendQuery , useLazyPatchCommentQuery ,

        useLazyGetMessagesQuery , useLazySetMessagesQuery ,

        useLazyUpdateCurrentUserInfoQuery
    } = mainApi;
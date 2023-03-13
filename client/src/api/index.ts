import { LoginData, User } from '@/models/User'
import { useAppSelector } from '@/redux/store/hooks'
import { RootState } from '@/redux/store/store'
import { InitialValuesLogin } from '@/scenes/LoginPage/Form'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const mainApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' ,
    
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


        getPosts : build.query<User , null>({
            query() {
                return {
                    url: '/posts',
                    method: 'GET',
                }
            },
        }),
        
        
        

    }),
})


export const {useLazyLoginQuery , useLazyRegisterQuery , useGetUserInfoQuery , useGetPostsQuery} = mainApi;
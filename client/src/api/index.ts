import { User } from '@/models/User'
import { InitialValuesLogin } from '@/scenes/LoginPage/Form'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface Post {
    id: number
    name: string
}

export const mainApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (build) => ({

        getPost: build.query<Post, number>({
            query: (id) => `post/${id}`,
        }),

        login: build.query<any, InitialValuesLogin>({
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
                    url: '/users',
                    method: 'GET',
                    params : {
                        id : userId
                    }
                }
            },
        }),
        

    }),
})


export const {useLazyLoginQuery , useLazyRegisterQuery , useGetUserInfoQuery} = mainApi;
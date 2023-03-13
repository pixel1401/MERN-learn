
export interface LoginData {
    token: string
    user: User
}


export interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    picturePath: string
    friends: any[]
    location: string
    occupation: string
    viewedProfile: number
    impressions: number
    createdAt: string
    updatedAt: string
    __v: number
}
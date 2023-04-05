export interface Post {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    location: string;
    description: string;
    picturePath: string;
    userPicturePath: string;
    audioPath : string;
    likes: Likes;
    comments: string[];
    __v: number;
    createdAt: Date;
    updatedAt: Date;
}

interface Likes {
    [key: string]: boolean;
}
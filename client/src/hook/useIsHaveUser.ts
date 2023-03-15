import { User } from "@/models/User";
import { useAppSelector } from "@/redux/store/hooks";
import { useEffect, useState } from "react";




export const useIsHaveUser =  (userId? : string ) : User  | undefined  => {
    if(userId == undefined) return ;

    let user;

    const users = useAppSelector((state) => state.authSlice.users);

    
    
        let searchUser : User | undefined ; 

        console.log(users , userId);
        
        users.find((user)=> {
            if(Object.keys(user)[0] == userId) {
                searchUser = Object.values(user)[0] as User | undefined ;
            }
        });
        user = searchUser;
    

    return user

}
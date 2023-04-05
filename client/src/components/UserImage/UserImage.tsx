import { BASE_URL } from "@/api";
import { Box } from "@mui/material";
import {styled} from "@mui/system";
import { FC } from "react";
import logo from "../../assets/react.svg";

interface UserImageProps  {
    img? : string ,
    size? : string | number
}


const UserImage : FC<UserImageProps> = ({img , size = 60}) => {
    return <Box width={size}  height={size}>
        <img 
            src= { img != null ?  `${BASE_URL}/assets/img/${img}` :  logo }
            alt="user"

            style={{objectFit: 'cover', borderRadius: '50%' }}
            width={size}
            height={size}
        />
        
    </Box>
};


export default UserImage;
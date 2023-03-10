import { mainApi } from "@/const";
import { Box } from "@mui/material";
import {styled} from "@mui/system";
import { FC } from "react";
import logo from "../../assets/react.svg";

interface UserImageProps  {
    img? : string ,
    size? : number
}


const UserImage : FC<UserImageProps> = ({img , size = 60}) => {
    return <Box width={size}  height={size}>
        <img 
            src= { img != null ?  `${mainApi}/assets/${img}` :  logo }
            alt="user"

            style={{objectFit: 'cover', borderRadius: '50%' }}
            width={size}
            height={size}
        />
        
    </Box>
};


export default UserImage;
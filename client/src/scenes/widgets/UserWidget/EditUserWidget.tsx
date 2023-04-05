import FlexBetween from "@/components/FlexBetween/FlexBetween";
import BasicModal from "@/components/Modal/Modal";
import { User } from "@/models/User";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useLazyUpdateCurrentUserInfoQuery } from "@/api";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store/hooks";
import { setUser } from "@/redux/features/authSlice";


interface EditUserWidgetProps {
    userInfo: User,
    isUserModal: boolean,
    closeUserModal: Function,
    handleIsReload: Function
}

const EditUserWidget: FC<EditUserWidgetProps> = ({ isUserModal, closeUserModal, userInfo, handleIsReload }) => {

    const [fetchUserInfo] = useLazyUpdateCurrentUserInfoQuery();

    const dispatch = useAppDispatch();

    const { palette } = useTheme();

    const closeModal = () => {
        closeUserModal();
        // setOpenModalUser(false);
    }

    const [userName, setUserName] = useState(userInfo.firstName);
    const [userLastName, setUserLastName] = useState(userInfo.lastName);

    const [location, setLocation] = useState(userInfo.location);
    const [occupation, setOccupation] = useState(userInfo.occupation);


    const [imgUser, setImgUser] = useState<File | null>(null);



    const submit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(e);

        let formData = new FormData();

        formData.append('userId', userInfo._id ?? '');
        formData.append('firstName', userName);
        formData.append('lastName', userLastName);
        formData.append('location', location);
        formData.append('occupation', occupation);
        if (imgUser) {
            formData.append('picturePath', imgUser?.name ?? '');
            formData.append('picture', imgUser!);
        }



        const idToast = toast.loading('Pleas wait ...');



        let data = await fetchUserInfo(formData);

        if (data.data) {
            toast.update(idToast, { render: "All is good", type: "success", isLoading: false, autoClose: 2000 });
            dispatch(setUser(data.data));
            handleIsReload();
        } else {
            toast.update(idToast, { render: "Error", type: "error", isLoading: false, autoClose: 2000, });
        }


        console.log(data);

    }


    return (
        <>
            <BasicModal isOpen={isUserModal} close={() => closeModal()}>
                <form onSubmit={(e) => submit(e)} >
                    <Box display={'flex'} flexDirection={'column'} gap={'15px'} >
                        <TextField
                            label="Name"
                            required={true}
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            name="email"
                        />
                        <TextField
                            label="LastName"
                            required={true}
                            onChange={(e) => setUserLastName(e.target.value)}
                            value={userLastName}
                            name="lastName"
                        />

                        <TextField
                            label="Location"
                            required={true}
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            name="Location"
                        />

                        <TextField
                            label="Occupation"
                            required={true}
                            onChange={(e) => setOccupation(e.target.value)}
                            value={occupation}
                            name="Occupation"
                        />


                        <Dropzone
                            accept={{ accepted: ['image/png', 'image/jpeg'] }}
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                                setImgUser(acceptedFiles[0])
                            }
                        >
                            {({ getRootProps, getInputProps }) => (
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!imgUser ? (
                                        <p>Add Picture Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{imgUser?.name ?? ''}</Typography>
                                            <EditOutlinedIcon />
                                        </FlexBetween>
                                    )}
                                </Box>
                            )}
                        </Dropzone>



                        <Button type="submit">Update</Button>

                    </Box>
                </form>


            </BasicModal>
        </>
    )
}


export default EditUserWidget;
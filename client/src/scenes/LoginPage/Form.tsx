import { useCallback, useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone, { useDropzone } from "react-dropzone";
import FlexBetween from "@/components/FlexBetween/FlexBetween";
import { setLogin } from "@/redux/features/authSlice";
import { useLazyLoginQuery, useLazyRegisterQuery } from "@/api";
import {  toast } from 'react-toastify';





const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});



interface InitialValuesRegister {
    firstName: string
    lastName: string,
    email: string,
    password: string,
    location: string,
    occupation: string,
    picture: File | null,
}


export interface InitialValuesLogin {
    email: string,
    password: string,
}


const initialValuesRegister: InitialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: null,
};

 const initialValuesLogin: InitialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";


    let [fetchLogin , {data   , isFetching , isError }] = useLazyLoginQuery();
    let [fetchRegister ] = useLazyRegisterQuery();




    const register = async (values: InitialValuesRegister, onSubmitProps: any) => {
        // this allows us to send form info with image

        const formData = new FormData();
        for (let [name , value] of Object.entries(values)) {
            formData.append(name, value );
        }
        formData.append("picturePath", values.picture?.name ?? '');
        
        // const savedUserResponse = await fetch(
        //     "http://localhost:3001/auth/register",
        //     {
        //         method: "POST",
        //         body: formData,
        //     }
        // );
        // const savedUser = await savedUserResponse.json();
        const idToast = toast.loading("Please wait...")

        const savedUserResponse = await fetchRegister(formData);

        const savedUser = await savedUserResponse.data;

        onSubmitProps.resetForm();

        if (savedUser) {
            toast.update(idToast, { render: "All is good", type: "success", isLoading: false  , autoClose: 2000});
            setPageType("login");
        }else {
            toast.update(idToast, { render: "Error", type: "error", isLoading: false , autoClose: 2000,  });
        }
    };

    const login = async (values: InitialValuesLogin, onSubmitProps: any) => {
        // const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(values),
        // });

        const idToast = toast.loading("Please wait...")

        let data = await fetchLogin(values);


        
        const loggedIn = await data.data;
        onSubmitProps.resetForm();
        
        
        if (loggedIn) {
            toast.update(idToast, { render: "All is good", type: "success", isLoading: false  , autoClose: 2000});
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/");
        }else {
            toast.update(idToast, { render: "Error", type: "error", isLoading: false , autoClose: 2000,  });
        }
    };

    const handleFormSubmit = async (values: InitialValuesLogin & InitialValuesRegister, onSubmitProps: FormikHelpers<InitialValuesLogin & InitialValuesRegister>) => {
        if (isLogin) await login(values as InitialValuesLogin, onSubmitProps);
        if (isRegister) await register(values as InitialValuesRegister, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={(isLogin ? initialValuesLogin : initialValuesRegister) as InitialValuesLogin & InitialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={
                                        Boolean(touched.firstName) && Boolean(errors.firstName)
                                    }
                                    helperText={(touched.firstName && errors.firstName) as String}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={(touched.lastName && errors.lastName) as String}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={(touched.location && errors.location) as String}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={
                                        Boolean(touched.occupation) && Boolean(errors.occupation)
                                    }
                                    helperText={(touched.occupation && errors.occupation) as String}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.secondary.main}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        accept={{ accepted: ['image/png', 'image/jpeg'] }}
                                        multiple={false}
                                        onDrop={ (acceptedFiles )  =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                       {({ getRootProps, getInputProps   }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture?.name ?? ''}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )} 
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={(touched.email && errors.email) as String}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={(touched.password && errors.password) as String}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.paper,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                : "Already have an account? Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;
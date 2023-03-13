import FlexBetween from "@/components/FlexBetween/FlexBetween";
import UserImage from "@/components/UserImage/UserImage";
import { Box, Button, Divider, IconButton, InputBase, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC, useState } from "react";

import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import WidgetWrapper from "@/components/WidgetWrapper/WidgetWrapper";
import Dropzone from "react-dropzone";



const MyPostWidget : FC = () => {

    const dispatch = useAppDispatch();
    const [isImage, setIsImage] = useState(false);
    
    const [image, setImage] = useState<File | null>(null);

    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const _id = useAppSelector((state) => state.authSlice.user?._id);
    const token = useAppSelector((state) => state.authSlice.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.secondary.main;
    const medium = palette.secondary.contrastText;


    const handlePost = () => {

    }



    return (
        <WidgetWrapper height={'fit-content'}>
          <FlexBetween gap="1.5rem">
            <UserImage  />
            <InputBase
              placeholder="What's on your mind..."
              onChange={(e) => setPost(e.target.value)}
              value={post}
              sx={{
                width: "100%",
                backgroundColor: palette.secondary.light,
                borderRadius: "2rem",
                padding: "1rem 2rem",
              }}
            />
          </FlexBetween>
          {isImage && (
            <Box
              border={`1px solid ${medium}`}
              borderRadius="5px"
              mt="1rem"
              p="1rem"
            >
              <Dropzone
                accept={{ accepted: ['image/png', 'image/jpeg'] }}
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      width="100%"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>Add Image Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                    {image && (
                      <IconButton
                        onClick={() => setImage(null)}
                        sx={{ width: "15%" }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          )}
    
          <Divider sx={{ margin: "1.25rem 0" }} />
    
          <FlexBetween>
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
              <ImageOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Image
              </Typography>
            </FlexBetween>
    
            {isNonMobileScreens ? (
              <>
                <FlexBetween gap="0.25rem">
                  <GifBoxOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Clip</Typography>
                </FlexBetween>
    
                <FlexBetween gap="0.25rem">
                  <AttachFileOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Attachment</Typography>
                </FlexBetween>
    
                <FlexBetween gap="0.25rem">
                  <MicOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Audio</Typography>
                </FlexBetween>
              </>
            ) : (
              <FlexBetween gap="0.25rem">
                <MoreHorizOutlined sx={{ color: mediumMain }} />
              </FlexBetween>
            )}
    
            <Button
              disabled={!post}
              onClick={handlePost}
              sx={{
                color: palette.background.paper,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              POST
            </Button>
          </FlexBetween>
        </WidgetWrapper>
      );
}



export default MyPostWidget;
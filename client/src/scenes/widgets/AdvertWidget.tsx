import { BASE_URL } from "@/api";
import FlexBetween from "@/components/FlexBetween/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper/WidgetWrapper";
import { Typography, useTheme } from "@mui/material";
import { FC } from "react";


const AdvertWidget: FC = () => {
    const { palette } = useTheme();
    const dark = palette.secondary.dark;
    const main = palette.secondary.main;
    const medium = palette.secondary.contrastText;

    return (
        <>
            <WidgetWrapper height={'fit-content'}>
                <FlexBetween>
                    <Typography color={dark} variant="h5" fontWeight="500">
                        Sponsored
                    </Typography>
                    <Typography color={medium}>Create Ad</Typography>
                </FlexBetween>
                <img
                    width="100%"
                    height="auto"
                    alt="advert"
                    src={`${BASE_URL}/assets/info4.jpeg`}
                    style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
                />
                <FlexBetween>
                    <Typography color={main}>MikaCosmetics</Typography>
                    <Typography color={medium}>mikacosmetics.com</Typography>
                </FlexBetween>
                <Typography color={medium} m="0.5rem 0">
                    Your pathway to stunning and immaculate beauty and made sure your skin
                    is exfoliating skin and shining like light.
                </Typography>
            </WidgetWrapper>
        </>
    )
};


export default AdvertWidget; 
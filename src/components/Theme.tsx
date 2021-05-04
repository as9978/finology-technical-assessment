import { TextStyle, ViewStyle, ImageStyle } from "react-native";
import {
  createText,
  createBox,
  useTheme as useReTheme,
  createTheme,
} from "@shopify/restyle";

export const theme = createTheme({
  breakpoints: {},
  colors: {
    blue: "#40BFFF",
    lightBlue: "rgba(64, 191, 255, 0.1)",
    red: "#FB7181",
    yellow: "#FFC833",
    orange: "#FA983A",
    green: "#53D1B6",
    purple: "#5C61F4",
    dark: "#223263",
    grey: "#9098B1",
    light: "#EBF0FF",
    white: "#FFFFFF",
    transparent: "transparent",
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    xs: 2.5,
    s: 5,
    m: 15,
    l: 20,
    xl: 100,
  },
  textVariants: {
    heading1: {
      fontFamily: "Poppins-Bold",
      fontSize: 32,
      spacing: 0.5,
      color: "dark",
    },
    heading2: {
      fontFamily: "Poppins-Bold",
      fontSize: 24,
      spacing: 0.5,
      color: "white",
    },
    heading3: {
      fontFamily: "Poppins-Bold",
      fontSize: 20,
      spacing: 0.5,
      color: "dark",
    },
    heading4: {
      fontFamily: "Poppins-Bold",
      fontSize: 16,
      spacing: 0.5,
      color: "dark",
    },
    heading5: {
      fontFamily: "Poppins-Bold",
      fontSize: 14,
      spacing: 0.5,
      color: "dark",
    },
    heading6: {
      fontFamily: "Poppins-Bold",
      fontSize: 10,
      spacing: 0.5,
      color: "dark",
    },
    largeTextBold: {
      fontFamily: "Poppins-Bold",
      fontSize: 16,
      spacing: 0.5,
      color: "grey",
    },
    largeTextRegular: {
      fontFamily: "Poppins-Regular",
      fontSize: 16,
      spacing: 0.5,
      color: "grey",
    },
    mediumTextBold: {
      fontFamily: "Poppins-Bold",
      fontSize: 14,
      spacing: 0.5,
      color: "grey",
    },
    mediumTextRegular: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      spacing: 0.5,
      color: "grey",
    },
    smallTextBold: {
      fontFamily: "Poppins-Bold",
      fontSize: 12,
      spacing: 0.5,
      color: "grey",
    },
    smallTextRegular: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      spacing: 0.5,
      color: "grey",
    },
    largeCaptionBold: {
      fontFamily: "Poppins-Bold",
      fontSize: 12,
      spacing: 0.5,
      color: "grey",
    },
    largeCaptionRegular: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      spacing: 0.5,
      color: "grey",
    },
    normalCaptionBold: {
      fontFamily: "Poppins-Bold",
      fontSize: 10,
      spacing: 0.5,
      color: "grey",
    },
    normalCaptionRegular: {
      fontFamily: "Poppins-Regular",
      fontSize: 10,
      spacing: 0.5,
      color: "grey",
    },
    largeLinkBold: {
      fontFamily: "Poppins-Bold",
      fontSize: 14,
      spacing: 0.5,
      color: "blue",
    },
    largeLinkRegular: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      spacing: 0.5,
      color: "blue",
    },
  },
});

export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles = <T extends NamedStyles<T>>(
  styles: (theme: Theme) => T
) => () => {
  const currentTheme = useTheme();
  return styles(currentTheme);
};

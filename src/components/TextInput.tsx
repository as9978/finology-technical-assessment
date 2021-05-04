import React, { forwardRef } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import { Box, useTheme, Theme } from "./Theme";
import { IconName } from "./index";

interface TextInputProps extends RNTextInputProps {
  icon?: IconName;
  touched?: boolean;
  error?: string;
  fill?: boolean;
  iconColor?: keyof Theme["colors"];
}

export default forwardRef<RNTextInput, TextInputProps>(
  ({ icon, touched, error, fill, iconColor, ...props }, ref) => {
    const theme = useTheme();

    const color = !touched ? "grey" : error ? "red" : "blue";
    const iColor = theme.colors[color];

    return (
      <Box
        flexDirection="row"
        alignItems="center"
        width="100%"
        padding="s"
        borderWidth={0.5}
        borderColor={color}
        borderRadius="s"
      >
        {icon && (
          <Icon
            name={icon}
            style={{ marginRight: theme.borderRadii.m }}
            size={20}
            color={iconColor ? theme.colors[iconColor] : iColor}
          />
        )}
        <RNTextInput
          ref={ref}
          placeholderTextColor={theme.colors[color]}
          underlineColorAndroid="transparent"
          style={{
            fontFamily: fill ? "Poppins-Bold" : "Poppins-Regular",
            flex: 1,
            fontSize: 12,
          }}
          {...props}
        />
      </Box>
    );
  }
);

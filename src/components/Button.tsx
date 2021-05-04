import React from "react";
import {
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  ButtonProps as RNButtonProps,
  ActivityIndicator,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import { Text, Box, Theme, useTheme } from "./Theme";
import { IconName } from "./index";

const buttonVariants = {
  transparent: {
    backgroundColor: "transparent",
    color: "grey",
    borderWidth: 0.5,
  },
  primary: {
    backgroundColor: "blue",
    color: "white",
    borderWidth: undefined,
  },
  semiTransparent: {
    backgroundColor: "lightBlue",
    color: "blue",
    borderWidth: 0.5,
  },
  light: {
    backgroundColor: "transparent",
    color: "grey",
    borderWidth: 0.5,
  },
  link: {
    backgroundColor: "transparent",
    color: "blue",
    borderWidth: undefined,
  },
};

export interface ButtonProps extends RNButtonProps {
  title: string;
  variant: keyof typeof buttonVariants;
  containerProps?: StyleProp<ViewStyle>;
  icon?: {
    name: IconName;
    color: keyof Theme["colors"];
    size: number;
    position: "left" | "right";
    style?: StyleProp<ViewStyle>;
  };
  textColorProp?: keyof Theme["colors"];
  textVariant?: keyof Theme["textVariants"];
  isLoading?: boolean;
  large?: boolean;
  description?: string;
  onPress: () => void;
}

export default ({
  title,
  containerProps,
  icon,
  textColorProp,
  textVariant,
  isLoading,
  variant,
  large,
  description,
  onPress,
  ...props
}: ButtonProps) => {
  const theme = useTheme();

  const { backgroundColor, color, borderWidth } = buttonVariants[variant];
  const width = large && "80%";

  return (
    <TouchableOpacity style={{ width: "100%" }} {...props} {...{ onPress }}>
      <Box
        alignItems="center"
        paddingVertical="s"
        paddingHorizontal="m"
        alignSelf="center"
        borderRadius="s"
        flexDirection={icon || isLoading ? "row" : undefined}
        borderColor={textColorProp ? textColorProp : "white"}
        {...{ backgroundColor, borderWidth, width }}
        {...containerProps}
      >
        {isLoading && (
          <ActivityIndicator
            color={textColorProp ? textColorProp : "white"}
            size="small"
            style={{ marginRight: theme.spacing.s }}
          />
        )}
        {icon?.position === "left" && !isLoading && (
          <Icon
            name={icon.name}
            color={icon.color}
            size={icon.size}
            style={[{ marginRight: theme.spacing.s }, icon.style]}
          />
        )}
        {description ? (
          <Box flexDirection="row" alignItems="center">
            <Text variant="mediumTextBold">{`${description} `}</Text>
            <Text
              variant={
                textVariant
                  ? textVariant
                  : variant === "light"
                  ? "smallTextRegular"
                  : "mediumTextBold"
              }
              color={textColorProp ? textColorProp : color}
            >
              {title}
            </Text>
          </Box>
        ) : (
          <Text
            variant={
              textVariant
                ? textVariant
                : variant === "light"
                ? "smallTextRegular"
                : "mediumTextBold"
            }
            color={textColorProp ? textColorProp : color}
          >
            {title}
          </Text>
        )}
        {icon?.position === "right" && !isLoading && (
          <Icon
            name={icon.name}
            color={icon.color}
            size={icon.size}
            style={[{ marginLeft: theme.spacing.s }, icon.style]}
          />
        )}
      </Box>
    </TouchableOpacity>
  );
};

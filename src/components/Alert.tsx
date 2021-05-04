import React, { memo, useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Pressable,
} from "react-native";

import { IconName, AlertType } from "./index";
import Button, { ButtonProps } from "./Button";
import RoundedIconButton from "./RoundedIconButton";
import { Box, Text, Theme, useTheme } from "./Theme";

interface AlertProps extends AlertType {
  setAction: React.Dispatch<React.SetStateAction<AlertType | null>>;
  position?: "TOP" | "MIDDLE" | "BOTTOM";
  duration?: number;
  confirmButton?: ButtonProps;
  declineButton?: ButtonProps;
}

const { width } = Dimensions.get("window");

const AnimatedBox = Animated.createAnimatedComponent(Box);

const Alert = memo(
  ({
    message,
    variant,
    setAction,
    duration = 3000,
    position = "BOTTOM",
    confirmButton,
    declineButton,
  }: AlertProps) => {
    const theme = useTheme();

    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-width * 0.84)).current;
    const timerScale = useRef(new Animated.Value(1)).current;

    var backgroundColor: keyof Theme["colors"] = "red";
    var name: IconName = "x";

    if (variant === "SUCCESS") {
      backgroundColor = "green";
      name = "check-circle";
    } else if (variant === "WARNING") {
      backgroundColor = "orange";
      name = "alert-triangle";
    } else if (variant === "INFO") {
      backgroundColor = "blue";
      name = "info";
    }

    const startAnimations = () => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.timing(translateX, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }).start(() => {
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0,
              duration: 750,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(timerScale, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => setAction(null));
        });
      });
    };

    const closeAnimation = () => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(timerScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setAction(null));
    };

    useEffect(() => {
      startAnimations();
    }, []);

    return (
      <Pressable
        style={[
          StyleSheet.absoluteFillObject,
          {
            paddingTop: StatusBar.currentHeight,
            paddingBottom: theme.spacing.s,
            backgroundColor: theme.colors.transparent,
            flex: 1,
            justifyContent:
              position === "BOTTOM"
                ? "flex-end"
                : position === "MIDDLE"
                ? "center"
                : "flex-start",
            alignItems: "center",
            zIndex: 1000,
          },
        ]}
        onPress={closeAnimation}
      >
        <AnimatedBox
          paddingHorizontal="l"
          paddingVertical="m"
          // marginTop="s"
          alignItems="center"
          borderRadius="s"
          width="84%"
          overflow="hidden"
          {...{ opacity, backgroundColor }}
          style={{ transform: [{ scale }] }}
        >
          <Box flexDirection="row" alignItems="center" justifyContent="center">
            <RoundedIconButton
              {...{ name }}
              color="white"
              backgroundColor="transparent"
              size={26}
              onPress={closeAnimation}
              iconRatio={0.8}
            />
            <Text
              variant="largeTextRegular"
              color="white"
              textAlign="left"
              marginLeft="s"
            >
              {message}
            </Text>
          </Box>
          {(confirmButton || declineButton) && (
            <Box
              flexDirection="row"
              marginTop="s"
              width="100%"
              alignItems="center"
            >
              {declineButton && (
                <Button
                  {...declineButton}
                  onPress={() => {
                    declineButton.onPress();
                    closeAnimation();
                  }}
                />
              )}
              {confirmButton && <Button {...confirmButton} />}
            </Box>
          )}
          <AnimatedBox
            position="absolute"
            bottom={0}
            width={width * 0.84}
            borderBottomRightRadius="m"
            borderTopRightRadius="m"
            borderBottomLeftRadius="m"
            height={5}
            backgroundColor="white"
            style={{
              transform: [{ translateX }, { scale: timerScale }],
            }}
          />
        </AnimatedBox>
        {/* </Box> */}
      </Pressable>
    );
  }
);

export default Alert;

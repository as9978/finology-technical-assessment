import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { Theme, Box, Text } from "./Theme";
import { IconName } from ".";

export interface RoundedIconProps {
  name: IconName;
  size: number;
  color: keyof Theme["colors"];
  backgroundColor: keyof Theme["colors"];
  iconRatio: number;
  component?: "feather" | "ionIcon";
  roundedText?: string;
  iconCenterize?: boolean;
}

const RoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
  iconRatio,
  iconCenterize = false,
}: RoundedIconProps) => {
  const iconSize = size * iconRatio;
  return (
    <Box
      height={size}
      width={size}
      justifyContent="center"
      alignItems="center"
      style={{ borderRadius: size / 2 }}
      {...{ backgroundColor }}
    >
      {iconCenterize ? (
        <Icon
          style={{ textAlign: "center", width: iconSize, height: iconSize }}
          size={iconSize}
          {...{ name, color }}
        />
      ) : (
        <Text style={{ width: iconSize, height: iconSize }} {...{ color }}>
          <Icon style={{ textAlign: "center" }} size={iconSize} {...{ name }} />
        </Text>
      )}
    </Box>
  );
};

RoundedIcon.defaultProps = {
  iconRatio: 0.7,
};

export default RoundedIcon;

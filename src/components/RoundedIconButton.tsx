import React, { memo } from "react";
import { TouchableOpacity } from "react-native";

import RoundedIcon, { RoundedIconProps } from "./RoundedIcon";

export interface RoundedIconButtonProps extends RoundedIconProps {
  disabled?: boolean;
  onPress: () => void;
}

export default memo(
  ({ disabled, onPress, ...props }: RoundedIconButtonProps) => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: props.size / 2,
          width: props.size,
          height: props.size,
          justifyContent: "center",
          alignItems: "center",
        }}
        {...{ onPress, disabled }}
      >
        <RoundedIcon {...props} />
      </TouchableOpacity>
    );
  }
);

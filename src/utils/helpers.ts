import { Dimensions, Insets, PixelRatio, StatusBar } from "react-native";
import { isIos } from "./platform";
import { ActionSheetOptions } from "@expo/react-native-action-sheet";

const screenHeight = isIos()
  ? Dimensions.get("window").height
  : Dimensions.get("screen").height - Dimensions.get("window").height >
    (StatusBar.currentHeight || 0)
  ? Dimensions.get("window").height + (StatusBar.currentHeight || 0)
  : Dimensions.get("window").height;

const screenWidth = Dimensions.get("window").width;

export const wp = (widthPercent: number | string) => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
export const hp = (heightPercent: string | number) => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const BASE_WIDTH = 390;
const BASE_HEIGHT = 790;

export const wpt = (points: number) => wp((points / BASE_WIDTH) * 100);
export const hpt = (points: number) => hp((points / BASE_HEIGHT) * 100);

export const startWithCapital = (text?: string) => {
  if (!text) {
    return text;
  }
  return text.slice(0, 1).toUpperCase() + text.slice(1);
};

/**
 * single params will set all
 *
 * two params will set top and bottom, right and left
 *
 * three params will set top, right and left, bottom
 *
 * four params will set top, right, bottom, keft
 */
export const getInsets = (
  top: number,
  right?: number,
  bottom?: number,
  left?: number
): Insets => ({
  top,
  right: right ?? top,
  bottom: bottom ?? top,
  left: left ?? right ?? top,
});

export const clamp = (val: number, lowerBound: number, upperBound: number) => {
  "worklet";
  if (val < lowerBound) {
    return lowerBound;
  }

  if (val > upperBound) {
    return upperBound;
  }

  return val;
};

export type ActionSheetAction = {
  label: string;
  onPress: () => void | Promise<void>;
  destructive?: boolean;
};

export function getActionSheetOptions(
  data: ActionSheetAction[],
  rootOptions?: Omit<ActionSheetOptions, "options" | "destructiveButtonIndex">
) {
  const labels: string[] = [];
  const destructiveButtonIndex: number[] = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    labels.push(item.label);

    if (item.destructive) {
      destructiveButtonIndex.push(i);
    }
  }

  const options: ActionSheetOptions = {
    ...rootOptions,
    options: labels,
    destructiveButtonIndex,
    cancelButtonIndex: rootOptions?.cancelButtonIndex || labels.length - 1,
  };

  const callback: (i?: number | undefined) => void | Promise<void> = (i) => {
    if (typeof i === "number") {
      return data[i].onPress();
    }
  };

  return [options, callback] as const;
}

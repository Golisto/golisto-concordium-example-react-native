import { dsColor, dsFont, scaleFont, scaleSize } from "~/designSystem";
import { StyleSheet } from "react-native";

export const IMAGE_SIZE = Math.round(scaleSize(56));

export const LIST_SEPARATOR_HIGHT = 1;

export const commonStyles = StyleSheet.create({
  containerWhite: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: dsColor.WHITE,
  },
  containerSand: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: dsColor.WHITE_DIRTY,
  },
  containerBlack: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: dsColor.BLACK_TRUE,
  },
  primaryButton: {
    borderRadius: scaleSize(28),
    backgroundColor: dsColor.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  primaryButtonText: {
    color: dsColor.WHITE,
    ...dsFont.BOLD,
    fontSize: scaleFont(16),
  },
  itemListImage: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    marginRight: 16,
    borderRadius: 4,
    backgroundColor: dsColor.GRAY_40,
  },
});

import { Platform, TextStyle } from "react-native";
import { scaleFont } from "../../utils";

import { dsColor } from "../DsColor";
import { DsFontName, DsTypoName } from "./DsTypo.constants";

type FontStyle = Pick<TextStyle, "fontFamily" | "fontWeight">;
export const dsFont = Object.freeze<{ [key in DsFontName]: FontStyle }>({
  [DsFontName.REGULAR]: {
    fontFamily:
      Platform.OS === "web" ? "Source Sans Pro" : "SourceSansPro-Regular",
    fontWeight: "400",
  },
  [DsFontName.SEMI_BOLD]: {
    fontFamily:
      Platform.OS === "web" ? "Source Sans Pro" : "SourceSansPro-SemiBold",
    fontWeight: "600",
  },
  [DsFontName.BOLD]: {
    fontFamily:
      Platform.OS === "web" ? "Source Sans Pro" : "SourceSansPro-Bold",
    fontWeight: "700",
  },
});

export const dsTypo = Object.freeze<{ [key in DsTypoName]: TextStyle }>({
  [DsTypoName.HEADING_1]: {
    ...dsTypoGenerate(64, { font: dsFont.SEMI_BOLD }),
  },
  [DsTypoName.HEADING_2]: {
    ...dsTypoGenerate(48, { font: dsFont.SEMI_BOLD }),
  },
  [DsTypoName.HEADING_3]: {
    ...dsTypoGenerate(40, { font: dsFont.SEMI_BOLD }),
  },
  [DsTypoName.HEADING_4]: {
    ...dsTypoGenerate(32, { font: dsFont.SEMI_BOLD }),
  },
  [DsTypoName.HEADING_5]: {
    ...dsTypoGenerate(24, { font: dsFont.SEMI_BOLD }),
  },
  [DsTypoName.HEADING_6]: {
    ...dsTypoGenerate(18, { font: dsFont.SEMI_BOLD }),
  },
  [DsTypoName.CAPTION_1]: {
    ...dsTypoGenerate(24),
  },
  [DsTypoName.CAPTION_2]: {
    ...dsTypoGenerate(20),
  },
  [DsTypoName.BODY]: {
    ...dsTypoGenerate(16),
  },
  [DsTypoName.LABEL]: {
    ...dsTypoGenerate(16, { font: dsFont.BOLD }),
  },
  [DsTypoName.SMALL_1]: {
    ...dsTypoGenerate(14),
  },
  [DsTypoName.SMALL_2]: {
    ...dsTypoGenerate(12, { lineHeight: 12 + 4 }),
  },
});

interface GenerateFontStyleOptions {
  /** The basic font style, either `FONT_REGULAR` or `FONT_BOLD`. Defaults to: `FONT_REGULAR` */
  font?: typeof dsFont.REGULAR | typeof dsFont.SEMI_BOLD | typeof dsFont.BOLD;
  /** Self-explanatory. Defaults to: `size + 8` */
  lineHeight?: number;
  /** The color of the text. Defaults to: `COLOR_BLACK` */
  color?: string;
}
export function dsTypoGenerate(
  size: number,
  {
    font = dsFont.REGULAR,
    lineHeight,
    color = dsColor.BLACK,
  }: GenerateFontStyleOptions = {}
) {
  return {
    ...font,
    fontSize: scaleFont(size),
    lineHeight: scaleFont(lineHeight ?? size + 8),
    color: color,
  };
}

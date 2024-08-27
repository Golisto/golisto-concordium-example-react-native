import React from "react";
import {
  AccessibilityRole,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";
import {
  dsColor,
  DsColorName,
  dsFont,
  DsFontName,
  dsTypo,
  DsTypoName,
} from "../../01-quarks";

interface DsTextPropStyles {
  /** The actual text component, rendering the children */
  text?: StyleProp<DsTextStyles["text"]>;
}
export interface DsTextProps extends Omit<TextProps, "style"> {
  /** The typography name to use for the rendered text. Check `Design System/Quarks/Typography` for more info. */
  variant?: DsTypoName;
  /** The color of the text. */
  colorName?: DsColorName;
  /** Override the default font, this is usually just used for changing the font weight. */
  overrideFont?: DsFontName;
  /** Assign the rendered text's horizontal justification. */
  horizontalJustify?: TextStyle["textAlign"];
  /** Use this prop to override any of the default styles. */
  styles?: DsTextPropStyles;
  /**
   * Shorthand for styling the `DsTextPropStyles.text` element.
   *
   * _Notice: These styles are overridden by conflicting styles in the `styles` prop_
   */
  style?: DsTextPropStyles["text"];
  center?: Boolean;
  gray?: Boolean;
  bold?: Boolean;
  semiBold?: Boolean;
  white?: Boolean;
  primary?: Boolean;
  small?: Boolean;
}

/** Plain text component. */
export const DsText: React.FC<DsTextProps> = ({
  variant = DsTypoName.BODY,
  colorName = DsColorName.BLACK,
  overrideFont,
  horizontalJustify = "auto",
  styles,
  style,
  children,
  center,
  gray,
  bold,
  semiBold,
  white,
  primary,
  small,
  ...otherProps
}) => {
  const typoStyle = cStylesTypo[variant];
  const colorStyle: TextStyle = { color: dsColor[colorName] };
  let fontStyle: TextStyle | null =
    overrideFont != null ? dsFont[overrideFont] : null;
  const horizontalJustifyStyle: TextStyle = { textAlign: horizontalJustify };

  const isHeading = variant.startsWith("HEADING");
  const role: AccessibilityRole = isHeading ? "header" : "text";

  if (gray) {
    colorStyle.color = dsColor.GRAY;
  }

  if (primary) {
    colorStyle.color = dsColor.PRIMARY;
  }

  if (bold) {
    fontStyle = dsFont.BOLD;
  }
  if (semiBold) {
    fontStyle = dsFont.SEMI_BOLD;
  }
  if (white) {
    colorStyle.color = dsColor.WHITE;
  }
  if (small) {
    variant = DsTypoName.SMALL_1;
  }

  return (
    <Text
      {...otherProps}
      style={[
        cStyles.text,
        typoStyle,
        colorStyle,
        fontStyle,
        horizontalJustifyStyle,
        style,
        styles?.text,
        center ? { textAlign: "center" } : null,
      ]}
      accessibilityRole={role}
    >
      {children}
    </Text>
  );
};

export type DsTextStyles = typeof cStyles;
export const cStyles = StyleSheet.create({
  text: {} as TextStyle,
});

export const cStylesTypo = StyleSheet.create<{
  [key in DsTypoName]: TextStyle;
}>({
  [DsTypoName.HEADING_1]: dsTypo[DsTypoName.HEADING_1],
  [DsTypoName.HEADING_2]: dsTypo[DsTypoName.HEADING_2],
  [DsTypoName.HEADING_3]: dsTypo[DsTypoName.HEADING_3],
  [DsTypoName.HEADING_4]: dsTypo[DsTypoName.HEADING_4],
  [DsTypoName.HEADING_5]: dsTypo[DsTypoName.HEADING_5],
  [DsTypoName.HEADING_6]: dsTypo[DsTypoName.HEADING_6],
  [DsTypoName.CAPTION_1]: dsTypo[DsTypoName.CAPTION_1],
  [DsTypoName.CAPTION_2]: dsTypo[DsTypoName.CAPTION_2],
  [DsTypoName.BODY]: dsTypo[DsTypoName.BODY],
  [DsTypoName.LABEL]: dsTypo[DsTypoName.LABEL],
  [DsTypoName.SMALL_1]: dsTypo[DsTypoName.SMALL_1],
  [DsTypoName.SMALL_2]: dsTypo[DsTypoName.SMALL_2],
});

export const Header5: React.FC<DsTextProps> = (props) => {
  return <DsText variant={DsTypoName.HEADING_5} {...props}></DsText>;
};

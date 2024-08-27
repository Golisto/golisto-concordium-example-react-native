import React, { useCallback, useMemo } from "react";
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { dsColor, DsColorName, DsTypoName } from "../../01-quarks";
import { DsButtonSize, DsButtonVariant } from "./DsButton.constants";

import Color from "color";

import { DsText } from "../DsText";
import { cssLikePadding } from "../../utils";
import { DsButtonLoadingIndicator } from "./LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { wpt } from "~/utils/helpers";

interface DsButtonStylesPropType {
  /** The `Pressable` providing events and visual feedback. */
  wrapper?: PressableProps["style"];
  /** The `Pressable` providing events and visual feedback. When the button state is disabled */
  wrapper_state_disabled?: PressableProps["style"];
  /** The content text inside the button. */
  text?: StyleProp<DsButtonStyles["text"]>;
  /** The text style when the button is in a loading state. The components uses this to hide the text using opacity, so the button size is maintained. */
  text_state_loading?: StyleProp<DsButtonStyles["text_state_loading"]>;
}
interface DsButtonPropsType extends Omit<PressableProps, "disabled" | "style"> {
  /** The text to display inside the button. */
  text: string;
  /** The button visual variant. Ex: Rounded or Boxed */
  variant?: DsButtonVariant;
  /** The size of the button. Ex. Large, Medium, or Small */
  size?: DsButtonSize;
  /** The background color of the button. */
  colorName?: DsColorName;
  /**
   * Wether the color should only apply to the outline or the whole button
   * @default false
   */
  outlined?: boolean;
  /**
   * Wether or not the button should display a loading state.
   * @default false
   */
  loading?: boolean;
  /**
   * Wether press behavior is disabled. The button visuals will also reflect this.
   * @default false
   */
  disabled?: boolean;

  secondary?: boolean;
  /** Use this prop to override any of the default styles. */
  styles?: DsButtonStylesPropType;
  /**
   * Shorthand for styling the `DsTextPropStyles.wrapper` element.
   *
   * _Notice: These styles are overridden by conflicting styles in the `styles` prop_
   */
  style?: DsButtonStylesPropType["wrapper"];

  large?: boolean;

  to?: string;

  prefix?: () => JSX.Element;
}

/** Text Button field. */
export const DsButton: React.FC<DsButtonPropsType> = ({
  text,
  variant = DsButtonVariant.ROUNDED,
  size = DsButtonSize.MEDIUM,
  colorName = DsColorName.PRIMARY,
  outlined = false,
  loading = false,
  disabled = false,
  styles,
  style,
  secondary,
  prefix,
  large,
  to,
  onPress,
  ...otherProps
}) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const color = Color(dsColor[colorName]);
  const isBright = color.luminosity() > 0.6;
  const colorPressed = isBright ? color.darken(0.2) : color.lighten(0.2);
  const textColorName = outlined
    ? colorName
    : isBright
    ? DsColorName.BLACK
    : DsColorName.WHITE;

  if (large) {
    size = DsButtonSize.LARGE;
  }

  const wrapperColorNameStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => ({
      borderColor: secondary
        ? "#ddd"
        : !pressed
        ? color.toString()
        : colorPressed.toString(),
      backgroundColor: outlined
        ? dsColor.WHITE
        : !pressed
        ? color.toString()
        : colorPressed.toString(),
    }),
    [colorName, colorPressed]
  );
  const wrapperVariantStyle = useMemo(() => {
    switch (variant) {
      default:
      case DsButtonVariant.BOXED:
        return cStyles.wrapper_variant_boxed;
      case DsButtonVariant.ROUNDED:
        return cStyles.wrapper_variant_rounded;
    }
  }, [variant]);
  const wrapperSizeStyle = useMemo(() => {
    switch (size) {
      default:
      case DsButtonSize.LARGE:
        return cStyles.wrapper_size_large;
      case DsButtonSize.MEDIUM:
        return cStyles.wrapper_size_medium;
      case DsButtonSize.SMALL:
        return cStyles.wrapper_size_small;
    }
  }, [size]);
  const wrapperPropsStyle = useCallback<
    (state: PressableStateCallbackType) => StyleProp<ViewStyle>
  >(
    (state) => [
      cStyles.wrapper,
      wrapperVariantStyle,
      wrapperSizeStyle,
      wrapperColorNameStyle(state),
      typeof style === "function" ? style(state) : style,
      typeof styles?.wrapper === "function"
        ? styles.wrapper(state)
        : styles?.wrapper,
      disabled ? cStyles.wrapper_state_disabled : null,
      disabled
        ? typeof styles?.wrapper_state_disabled === "function"
          ? styles.wrapper_state_disabled(state)
          : styles?.wrapper_state_disabled
        : null,
    ],
    [
      cStyles.wrapper,
      wrapperVariantStyle,
      wrapperSizeStyle,
      wrapperColorNameStyle,
      style,
      styles?.wrapper,
      color,
    ]
  );

  const loadingElement = loading ? (
    <DsButtonLoadingIndicator
      color={outlined ? dsColor[colorName] : dsColor[textColorName]}
    />
  ) : null;

  const handlePress = (evt) => {
    if (disabled) {
      return;
    }
    if (onPress) {
      onPress(evt);
    }
    if (to) {
      navigate(to as any);
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      {...otherProps}
      disabled={disabled || loading}
      onPress={handlePress}
      style={wrapperPropsStyle}
    >
      {({ pressed }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {prefix?.()}
          <DsText
            styles={{
              text: [
                cStyles.text,
                styles?.text,
                ...(loading
                  ? [cStyles.text_state_loading, styles?.text_state_loading]
                  : []),
                pressed && outlined ? { color: colorPressed.hex() } : null,
                secondary ? { color: "#a8a8a8" } : {},
              ],
            }}
            selectable={false}
            variant={DsTypoName.LABEL}
            colorName={textColorName}
            horizontalJustify="center"
          >
            {text}
          </DsText>

          {loadingElement}
        </View>
      )}
    </Pressable>
  );
};

export type DsButtonStyles = typeof cStyles;
export const cStyles = StyleSheet.create({
  wrapper: {
    position: "relative",
    borderWidth: 2,
  } as ViewStyle,

  wrapper_state_disabled: {
    opacity: 0.6,
  } as ViewStyle,

  wrapper_variant_boxed: {
    borderRadius: 4,
  } as ViewStyle,

  wrapper_variant_rounded: {
    borderRadius: Number.MAX_SAFE_INTEGER,
  } as ViewStyle,

  wrapper_size_large: {
    ...cssLikePadding(16, wpt(18)),
  } as ViewStyle,

  wrapper_size_medium: {
    ...cssLikePadding(12, wpt(14)),
  } as ViewStyle,

  wrapper_size_small: {
    ...cssLikePadding(8, wpt(10)),
  } as ViewStyle,

  text: {} as TextStyle,

  text_state_loading: {
    opacity: 0,
  } as TextStyle,
});

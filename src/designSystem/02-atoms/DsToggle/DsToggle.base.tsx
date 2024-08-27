import React from "react";
import type { FieldError } from "react-hook-form";
import {
  StyleProp,
  StyleSheet,
  Switch,
  SwitchProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { cssLikePadding } from "../../utils";
import { dsColor, dsTypo, DsTypoName } from "../../01-quarks";
import { DsFormFieldError } from "../DsFormFieldError";
import { DsText } from "../DsText";

interface DsTogglePropStyles {
  /** The outer most component wrapper */
  wrapper?: StyleProp<DsToggleStyles["wrapper"]>;
  /** The wrapper around everything inside the toggle border */
  toggleWrapper?: StyleProp<DsToggleStyles["toggleWrapper"]>;
  /** The actual toggle itself */
  toggle?: StyleProp<DsToggleStyles["toggle"]>;

  labelWrapper?: StyleProp<DsToggleStyles["labelWrapper"]>;
}
export interface DsToggleProps extends Omit<SwitchProps, "style"> {
  /** Short label to display above the input. */
  label?: string;

  description?: string;
  /**
   * Wether or not the toggle should be optional.
   * @default true
   */
  optional?: boolean;
  /**
   * The error message to be displayed, either as a `react-hook-form` `FieldError` object, or a simple string.
   * If so desired, the message can be a i18n key, which will then be looked up and found translation displayed.
   */
  error?: string | FieldError;
  /** Let the error message eat up some of the already available spacing between components. */
  errorNegativeSpacing?: number;
  /** Use this prop to override any of the default styles. */
  styles?: DsTogglePropStyles;
}

/** Toggle field. */
export const DsToggle: React.VFC<DsToggleProps> = React.forwardRef<
  Switch,
  DsToggleProps
>(
  (
    {
      optional = false,
      error,
      errorNegativeSpacing,
      styles,
      label,
      description,
      ...otherProps
    },
    ref
  ) => {
    const errorObject =
      typeof error === "string" ? { type: "custom", message: error } : error;

    return (
      <View style={[cStyles.wrapper, styles?.wrapper]}>
        {(label || description) && (
          <View style={[cStyles.labelWrapper, styles?.labelWrapper]}>
            {!!label && <DsText variant={DsTypoName.LABEL}>{label}</DsText>}
            {!!description && (
              <DsText variant={DsTypoName.SMALL_1} gray>
                {description}
              </DsText>
            )}
          </View>
        )}

        <View style={[cStyles.toggleWrapper, styles?.toggleWrapper]}>
          <Switch
            ref={ref}
            {...otherProps}
            style={[cStyles.toggle, styles?.toggle]}
          />

          <View
            style={[
              cStyles.toggleFoot,
              errorNegativeSpacing != null && error != null
                ? { marginBottom: -Math.abs(errorNegativeSpacing) }
                : null,
            ]}
          >
            <DsFormFieldError error={errorObject} />
          </View>
        </View>
      </View>
    );
  }
);

const INPUT_LINE_HEIGHT = dsTypo.BODY.lineHeight! - 4;

type DsToggleStyles = typeof cStyles;
const cStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  } as ViewStyle,

  labelWrapper: {
    flex: 1,
    marginRight: 24,
  } as ViewStyle,

  toggleWrapper: {} as ViewStyle,

  toggleHeadLeft: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  } as ViewStyle,

  toggleBody: {
    borderWidth: 1,
    borderRadius: 4,
    ...cssLikePadding((40 - INPUT_LINE_HEIGHT) / 2 - 1, 16 - 1),
    borderColor: dsColor.GRAY_70,
    backgroundColor: dsColor.WHITE,
  } as ViewStyle,

  toggle: {
    ...cssLikePadding(0),
    ...dsTypo.BODY,
    lineHeight: INPUT_LINE_HEIGHT,
  } as TextStyle,

  toggleFoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "baseline",
    ...cssLikePadding(0, 8),
  } as ViewStyle,
});

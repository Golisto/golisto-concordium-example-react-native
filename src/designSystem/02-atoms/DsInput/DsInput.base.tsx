import React, { useCallback, useState } from "react";
import type { FieldError, UseControllerReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { dsColor, DsColorName, dsTypo, DsTypoName } from "../../01-quarks";
import { cssLikePadding } from "../../utils";
import { DsFormFieldError } from "../DsFormFieldError";
import { DsText } from "../DsText";
import { DsInputType } from "./DsInput.constants";
import { generateInputTypeProps } from "./DsInput.utils";

interface DsInputPropStyles {
  /** The outer most component wrapper */
  wrapper?: StyleProp<DsInputStyles["wrapper"]>;
  /** The wrapper around everything inside the input border */
  inputWrapper?: StyleProp<DsInputStyles["inputWrapper"]>;
  /** The actual input itself */
  input?: StyleProp<DsInputStyles["input"]>;
  /** The style to be applied to the TextInput element when the input is focused */
  input_state_focus?: StyleProp<DsInputStyles["input_state_focus"]>;

  inputBody?: StyleProp<DsInputStyles["inputBody"]>;
}
export interface DsInputProps
  extends Omit<
    TextInputProps,
    "style" | Exclude<keyof UseControllerReturn["field"], "onBlur" | "onChange">
  > {
  /** The type of input. This will set various props based on what type is chosen, all of which can be overridden. */
  type?: DsInputType;
  /** Short label to display above the input. */
  label?: string;
  /**
   * Wether or not the input should be optional. Since it's much more likely to be the case, the default is for the input to display a non-optional state.
   * @default false
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
  styles?: DsInputPropStyles;

  labelAbove?: boolean;

  loading?: boolean;

  prefix?: string | null;

  value?: string;

  dynamicSize?: boolean;
}

/** Text input field. */
export const DsInput: React.FC<DsInputProps> = React.forwardRef<
  TextInput,
  DsInputProps
>(
  (
    {
      type = DsInputType.TEXT,
      placeholderTextColor,
      multiline,
      numberOfLines,
      textAlignVertical,
      label,
      optional = false,
      error,
      errorNegativeSpacing,
      styles,
      onFocus,
      onBlur,
      onChangeText,
      labelAbove,
      loading,
      prefix,
      dynamicSize,
      ...otherProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const { t } = useTranslation("components");

    const handleFocus = useCallback(
      (e) => {
        if (typeof onFocus === "function") onFocus(e);
        setIsFocused(true);
      },
      [onFocus]
    );
    const handleBlur = useCallback(
      (e) => {
        if (typeof onBlur === "function") onBlur(e);
        setIsFocused(false);
      },
      [onBlur]
    );

    const inputTypeProps = generateInputTypeProps(type);

    const inputFocusedStyles = isFocused
      ? [cStyles.input_state_focus, styles?.input_state_focus]
      : null;
    const inputHeightCalcStyles: TextStyle = {
      height: dynamicSize
        ? undefined
        : INPUT_LINE_HEIGHT *
          (multiline && numberOfLines != null ? numberOfLines : 1),
    };

    const errorObject =
      typeof error === "string" ? { type: "custom", message: error } : error;

    const labelElement =
      label != null && label !== "" ? (
        <DsText
          style={cStyles.inputHeadText}
          variant={labelAbove ? DsTypoName.LABEL : DsTypoName.SMALL_2}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {label}
        </DsText>
      ) : null;
    const optionalElement = optional ? (
      <DsText
        style={cStyles.inputHeadText}
        variant={DsTypoName.SMALL_2}
        colorName={DsColorName.GRAY}
        selectable={false}
      >
        {t("global.form.static.optional", { defaultValue: "Optional" })}
      </DsText>
    ) : null;

    return (
      <View style={[cStyles.wrapper, styles?.wrapper]}>
        <View style={[cStyles.inputWrapper, styles?.inputWrapper]}>
          <View
            style={[
              cStyles.inputHead,
              labelElement != null || optionalElement != null
                ? cStyles.inputHead_state_nonEmpty
                : null,
              labelAbove ? cStyles.inputHead_state_above : null,
            ]}
          >
            <View style={cStyles.inputHeadLeft}>{labelElement}</View>
            <View style={cStyles.inputHeadRight}>{optionalElement}</View>
          </View>
          <View style={[cStyles.inputBody, styles?.inputBody]}>
            {prefix != null ? (
              <DsText semiBold style={{ marginRight: 8 }}>
                {prefix}
              </DsText>
            ) : null}
            <TextInput
              ref={ref}
              pointerEvents={loading ? "none" : "auto"}
              {...inputTypeProps}
              placeholderTextColor={placeholderTextColor ?? dsColor.GRAY}
              textAlignVertical={
                textAlignVertical != null
                  ? textAlignVertical
                  : multiline
                  ? "top"
                  : "center"
              }
              {...otherProps}
              style={[
                cStyles.input,
                styles?.input,
                inputFocusedStyles,
                inputHeightCalcStyles,
                loading && {
                  opacity: 0.5,
                },
              ]}
              hitSlop={{
                top: 15,
                bottom: 15,
                left: 15,
                right: 15,
              }}
              multiline={multiline}
              numberOfLines={numberOfLines}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={onChangeText}
            />
          </View>
          <View
            style={[
              cStyles.inputFoot,
              errorNegativeSpacing != null && error != null
                ? { marginBottom: -Math.abs(errorNegativeSpacing) }
                : null,
            ]}
          >
            <DsFormFieldError error={errorObject} />
          </View>

          {loading && (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: 18,
                right: 8,
              }}
            />
          )}
        </View>
      </View>
    );
  }
);

const INPUT_LINE_HEIGHT = dsTypo.BODY.lineHeight! - 4;

type DsInputStyles = typeof cStyles;
const cStyles = StyleSheet.create({
  wrapper: {} as ViewStyle,

  inputWrapper: {} as ViewStyle,

  inputHead: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    ...cssLikePadding(0, 8),
    width: "100%",
  } as ViewStyle,

  inputHead_state_nonEmpty: {
    marginBottom: -8,
  } as ViewStyle,

  inputHead_state_above: {
    marginBottom: 8,
  } as ViewStyle,

  inputHeadLeft: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  } as ViewStyle,

  inputHeadRight: {
    marginLeft: 8,
  } as ViewStyle,

  inputHeadText: {
    ...cssLikePadding(0, 4),
    backgroundColor: dsColor.WHITE,
  } as ViewStyle,

  inputBody: {
    borderWidth: 1,
    borderRadius: 4,
    ...cssLikePadding((40 - INPUT_LINE_HEIGHT) / 2 - 1, 16 - 1),
    borderColor: dsColor.GRAY_70,
    backgroundColor: dsColor.WHITE,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  } as ViewStyle,

  input: {
    ...cssLikePadding(0),
    ...dsTypo.BODY,
    lineHeight: INPUT_LINE_HEIGHT,
    flex: 1,
  } as TextStyle,

  input_state_focus: {} as TextStyle,

  inputFoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "baseline",
    ...cssLikePadding(0, 8),
  } as ViewStyle,
});

import React from "react";
import type { FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextStyle } from "react-native";
import { DsColorName, DsTypoName } from "../../01-quarks";
import { DsText } from "../DsText";

interface DsFormFieldErrorPropStyles {
  text?: DsFormFieldErrorStyles["text"];
}
interface DsFormFieldErrorProps {
  /** The react-hook-form field error object. Passing an undefined value will cause the component to skip rendering. */
  error?: FieldError;
  /** Use this prop to override any of the default styles. */
  styles?: DsFormFieldErrorPropStyles;
  /**
   * Shorthand for styling the `DsFormFieldErrorPropStyles.text` element.
   *
   * _Notice: These styles are overridden by conflicting styles in the `styles` prop_
   */
  style?: DsFormFieldErrorPropStyles["text"];
}

/** Shows error messages in the correct format and automatically parses for the correct i18n. */
export const DsFormFieldError: React.FC<DsFormFieldErrorProps> = ({
  error,
  styles,
  style,
}) => {
  if (error == null) return null;

  let i18nKey;
  if (
    error.type === "invalid_type" ||
    (error.type === "too_small" && !error.message)
  ) {
    i18nKey = "components.global.form.error.required";
  } else {
    i18nKey = error.message!;
  }

  const { t } = useTranslation();

  return (
    <DsText
      style={[cStyles.text, style, styles?.text]}
      variant={DsTypoName.SMALL_2}
      colorName={DsColorName.RED}
      horizontalJustify={"right"}
    >
      {t(i18nKey)}
    </DsText>
  );
};

type DsFormFieldErrorStyles = typeof cStyles;
const cStyles = StyleSheet.create({
  text: {} as TextStyle,
});

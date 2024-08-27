import { DsInputType } from "./DsInput.constants";
import type { TextInputProps } from "react-native";

export function generateInputTypeProps(
  inputType: DsInputType
): Partial<TextInputProps> {
  switch (inputType) {
    case DsInputType.EMAIL:
      return {
        autoComplete: "email",
        autoCorrect: false,
        keyboardType: "email-address",
        autoCapitalize: "none",
        textContentType: "emailAddress",
      };

    case DsInputType.NAME:
      return {
        autoCapitalize: "words",
        autoComplete: "name",
        textContentType: "name",
      };

    case DsInputType.PASSWORD:
      return {
        autoComplete: "password",
        textContentType: "password",
        secureTextEntry: true,
      };

    default:
    case DsInputType.TEXT:
      return {};
    case DsInputType.NUMBER:
      return {
        keyboardType: "number-pad",
      };

    case DsInputType.USERNAME:
      return {
        autoComplete: "username",
        textContentType: "username",
        autoCorrect: false,
      };
    case DsInputType.CITY:
      return {
        textContentType: "addressCity",
      };
    case DsInputType.COUNTRY:
      return {
        textContentType: "countryName",
      };

    case DsInputType.SEARCH:
      return {
        textContentType: "none",
        returnKeyType: "search",
      };
  }
}

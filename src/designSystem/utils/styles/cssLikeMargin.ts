import { DimensionValue } from "react-native";

type MarginValue = DimensionValue | undefined;
interface MarginStyleProps {
  marginTop?: MarginValue;
  marginRight?: MarginValue;
  marginBottom?: MarginValue;
  marginLeft?: MarginValue;
}
export function cssLikeMargin(all: MarginValue): MarginStyleProps;
export function cssLikeMargin(
  vertical: MarginValue,
  horizontal: MarginValue
): MarginStyleProps;
export function cssLikeMargin(
  top: MarginValue,
  horizontal: MarginValue,
  bottom: MarginValue
): MarginStyleProps;
export function cssLikeMargin(
  top: MarginValue,
  right: MarginValue,
  bottom: MarginValue,
  left: MarginValue
): MarginStyleProps;
export function cssLikeMargin(...args: MarginValue[]): MarginStyleProps {
  return {
    marginTop: args[0],
    marginRight: args.length === 1 ? args[0] : args[1],
    marginBottom: args.length <= 2 ? args[0] : args[2],
    marginLeft:
      args.length === 1 ? args[0] : args.length <= 3 ? args[1] : args[3],
  };
}

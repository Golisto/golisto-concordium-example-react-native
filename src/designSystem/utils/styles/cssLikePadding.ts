type PaddingValue = "auto" | number | undefined
interface PaddingStyleProps {
  paddingTop?: PaddingValue
  paddingRight?: PaddingValue
  paddingBottom?: PaddingValue
  paddingLeft?: PaddingValue
}
export function cssLikePadding(all: PaddingValue): PaddingStyleProps
export function cssLikePadding(vertical: PaddingValue, horizontal: PaddingValue): PaddingStyleProps
export function cssLikePadding(top: PaddingValue, horizontal: PaddingValue, bottom: PaddingValue): PaddingStyleProps
export function cssLikePadding(top: PaddingValue, right: PaddingValue, bottom: PaddingValue, left: PaddingValue): PaddingStyleProps
export function cssLikePadding(...args: PaddingValue[]): PaddingStyleProps {
  return {
    paddingTop: args[0],
    paddingRight: args.length === 1 ? args[0] : args[1],
    paddingBottom: args.length <= 2 ? args[0] : args[2],
    paddingLeft: args.length === 1 ? args[0] : args.length <= 3 ? args[1] : args[3],
  }
}

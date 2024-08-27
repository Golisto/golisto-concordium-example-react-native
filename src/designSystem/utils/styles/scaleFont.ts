import { PixelRatio } from 'react-native'

/**
 * Takes any font size and scales it according to the `PixelRatio.getFontScale()` value.
 *
 * @param size The original font size
 * @returns The scaled font size
 */
export const scaleFont = (size: number) => size * PixelRatio.getFontScale()

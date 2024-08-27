import { Dimensions } from 'react-native'

const WINDOW_WIDTH = Dimensions.get('window').width
const SCALE_BASE_WIDTH = 375

/**
 * Takes any size and scales it according to a standard Golisto mobile design, based on the 375 px width used in those designs.
 *
 * @param size The original size
 * @returns The scaled size
 */
export const scaleSize = (size: number) => Math.round((WINDOW_WIDTH / SCALE_BASE_WIDTH) * size)

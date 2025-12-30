import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export { SCREEN_WIDTH, SCREEN_HEIGHT };

// Responsive scaling
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size: number): number =>
  (SCREEN_WIDTH / guidelineBaseWidth) * size;

export const verticalScale = (size: number): number =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;

export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

import {Platform, PixelRatio, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// based on a 5-inch device
const scale = width > height ? height / 680 : width / 320;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

/**
 * Get the time difference in hh:mm:ss format
 */
export function formattedTimeDifference(difference: number): string {
  const hr = Math.floor(difference / 3600);
  const min = Math.floor((difference - hr * 3600) / 60);
  const seconds = difference - hr * 3600 - min * 60;
  return (
    String(hr).padStart(2, '0') +
    ':' +
    String(min).padStart(2, '0') +
    ':' +
    String(seconds).padStart(2, '0')
  );
}

import {StyleSheet} from 'react-native';
import {colors} from '../../util/constants';

const style = (height: number, width: number) =>
  StyleSheet.create({
    button: {
      position: 'absolute',
      bottom: height * 0.02,
      right: width * 0.05,
      zIndex: 10,
      backgroundColor: colors.secondary,
      width: 60,
      height: 60,
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default style;

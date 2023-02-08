import {StyleSheet} from 'react-native';
import {colors} from '../../util/constants';

const styles = (height: number, width: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: width * 0.01,
      paddingVertical: height * 0.01,
      backgroundColor: colors.white,
    },
    flatListContainer: {
      width: '100%',
      paddingHorizontal: width * 0.02,
    },
  });

export default styles;

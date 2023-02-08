import {StyleSheet} from 'react-native';
import {colors} from '../../util/constants';
import {normalize} from '../../util/helper';

const styles = (height: number, width: number) =>
  StyleSheet.create({
    timerparentContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.02,
      width: '100%',
      flex: 1,
      elevation: 3,
      backgroundColor: colors.background,
      borderRadius: normalize(10),
      marginBottom: height * 0.01,
    },
    timerContainer: {
      flex: 0.7,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    actionButtonContainer: {
      flex: 0.3,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    timerStyle: {
      fontSize: normalize(18),
      fontWeight: '400',
      color: colors.black,
    },
  });

export default styles;

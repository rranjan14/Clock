import {StyleSheet} from 'react-native';
import {colors} from '../../util/constants';
import {normalize} from '../../util/helper';

const styles = (height: number, width: number) =>
  StyleSheet.create({
    timeInputContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
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
    textInput: {
      flex: 0.3,
      backgroundColor: colors.white,
      paddingVertical: height * 0.01,
      borderRadius: width * 0.01,
      paddingHorizontal: width * 0.02,
      color: colors.black,
    },
    inputContainer: {
      flex: 0.9,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    startButtonContainer: {
      flex: 0.1,
      marginTop: height * 0.02,
    },
    timerStyle: {
      fontSize: normalize(18),
      fontWeight: '400',
      color: colors.black,
    },
    startTimer: {
      fontSize: normalize(16),
      fontWeight: '400',
      color: colors.black,
    },
  });

export default styles;

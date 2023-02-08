import {StyleSheet} from 'react-native';
import {colors} from '../../util/constants';
import {normalize} from '../../util/helper';

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
    inputContainer: {
      flex: 0.9,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
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
    startButtonContainer: {
      flex: 0.1,
      marginTop: height * 0.02,
    },
    startTimer: {
      fontSize: normalize(16),
      fontWeight: '400',
      color: colors.black,
    },
  });

export default styles;

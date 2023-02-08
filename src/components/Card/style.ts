import {StyleSheet} from 'react-native';
import {colors} from '../../util/constants';
import {normalize} from '../../util/helper';

const styles = (height: number, width: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.02,
      width: '100%',
      elevation: 3,
      backgroundColor: colors.background,
      borderRadius: normalize(10),
      marginBottom: height * 0.01,
    },
    locationDetailsContainer: {
      flex: 0.3,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    timeContainer: {
      flex: 0.5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionButtonContainer: {
      flex: 0.2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    timestring: {
      fontSize: normalize(20),
      fontWeight: '400',
      color: colors.black,
    },
    tzText: {
      fontSize: normalize(13),
      fontWeight: '400',
      color: colors.black,
    },
  });

export default styles;

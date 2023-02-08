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
      width: '100%',
    },
    flatListContainer: {
      width: '100%',
      flex: 0.9,
      paddingHorizontal: width * 0.02,
    },
    listItemContainer: {
      paddingVertical: width * 0.02,
      textAlign: 'left',
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: colors.primaryDark,
    },
    listItemTitle: {
      fontSize: normalize(13),
      fontWeight: '400',
      color: colors.black,
    },
    inputContainerStyle: {
      width: '100%',
      flex: 0.1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: width * 0.01,
      marginHorizontal: width * 0.01,
      borderWidth: 1,
      borderRadius: 5,
    },
    input: {
      color: colors.black,
      fontSize: normalize(13),
      fontWeight: '400',
    },
  });

export default styles;

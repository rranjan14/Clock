import React from 'react';
import {TouchableOpacity} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import {colors} from '../../util/constants';
import {normalize} from '../../util/helper';
import style from './style';

type FloatingActionButtonProps = {
  onPress: () => void;
  height: number;
  width: number;
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = React.memo(
  props => {
    const styles = style(props.height, props.width);
    return (
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Octicons name="plus" size={normalize(16)} color={colors.background} />
      </TouchableOpacity>
    );
  },
);

export default FloatingActionButton;

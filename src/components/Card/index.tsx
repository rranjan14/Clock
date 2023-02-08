import moment from 'moment-timezone';
import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../util/constants';
import {normalize} from '../../util/helper';
import styles from './style';

type CardProps = {
  timezone: string;
  utcOffset: string;
  height: number;
  width: number;
  currentTime: number;
  onPress: (tz: string) => void;
  showDeleteButton: boolean;
};
const Card: React.FC<CardProps> = memo(props => {
  const style = styles(props.height, props.width);
  return (
    <View style={style.container}>
      <View style={style.locationDetailsContainer}>
        <View>
          <Text style={style.tzText}>{props.timezone}</Text>
        </View>
        <View>
          <Text style={style.tzText}>{props.utcOffset}</Text>
        </View>
      </View>
      <View style={style.timeContainer}>
        <View>
          <Text style={style.timestring}>
            {moment
              .tz(props.currentTime * 1000, props.timezone)
              .format('hh:mm A')}
          </Text>
        </View>
      </View>
      {props.showDeleteButton && (
        <TouchableOpacity
          style={style.actionButtonContainer}
          onPress={() => props.onPress(props.timezone)}>
          <Ionicons
            name="ios-trash-outline"
            color={colors.black}
            size={normalize(16)}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

export default Card;

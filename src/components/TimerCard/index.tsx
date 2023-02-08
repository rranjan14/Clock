import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../util/constants';
import {formattedTimeDifference, normalize} from '../../util/helper';
import style from './style';

export enum Time {
  Hour = 'hour',
  Min = 'min',
  Sec = 'sec',
}

export enum ComponentType {
  Input = 'input',
  Timer = 'timer',
}

export type TimerCardProps = {
  height: number;
  width: number;
  hour: number;
  min: number;
  sec: number;
  isPlaying: boolean;
  componentType: ComponentType;
  id: string;
  initialTime: number;
  onChangeText: (text: string, type: Time, id: string) => void;
  startTimer: (id: string) => void;
  updateTimer: (id: string, time: number) => void;
  deleteTimer: (id: string) => void;
};

const TimerCard: React.FC<TimerCardProps> = React.memo(props => {
  const styles = style(props.height, props.width);

  if (props.componentType === ComponentType.Input) {
    return (
      <View style={styles.timeInputContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="HH"
            keyboardType="number-pad"
            value={props.hour.toString().padStart(2, '0')}
            onChangeText={text => props.onChangeText(text, Time.Hour, props.id)}
            placeholderTextColor={colors.gray}
          />
          <TextInput
            style={styles.textInput}
            placeholder="MM"
            keyboardType="number-pad"
            value={props.min.toString().padStart(2, '0')}
            onChangeText={text => props.onChangeText(text, Time.Min, props.id)}
            placeholderTextColor={colors.gray}
          />
          <TextInput
            style={styles.textInput}
            placeholder="SS"
            keyboardType="number-pad"
            value={props.sec.toString().padStart(2, '0')}
            onChangeText={text => props.onChangeText(text, Time.Sec, props.id)}
            placeholderTextColor={colors.gray}
          />
        </View>
        <TouchableOpacity
          style={styles.startButtonContainer}
          onPress={() => props.startTimer(props.id)}>
          <Text style={styles.startTimer}>Start Timer</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.timerparentContainer}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerStyle}>
          {formattedTimeDifference(props.initialTime)}
        </Text>
      </View>
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity onPress={() => props.startTimer(props.id)}>
          <FontAwesome
            name={props.isPlaying ? 'pause' : 'play'}
            size={normalize(16)}
            color={colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.deleteTimer(props.id)}>
          <Ionicons
            name="ios-trash-outline"
            color={colors.black}
            size={normalize(16)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default TimerCard;

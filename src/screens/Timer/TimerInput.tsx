import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {Time} from '../../util/types';
import {colors} from '../../util/constants';

type TimerInputProps = {
  height: number;
  width: number;
  hour: string;
  min: string;
  sec: string;
  onChangeText: (text: string, type: Time) => void;
  saveTimer: () => void;
};

const TimerInput: React.FC<TimerInputProps> = props => {
  const style = styles(props.height, props.width);
  return (
    <View style={style.timeInputContainer}>
      <View style={style.inputContainer}>
        <TextInput
          style={style.textInput}
          placeholder="HH"
          keyboardType="number-pad"
          defaultValue={props.hour}
          onEndEditing={e => props.onChangeText(e.nativeEvent.text, Time.Hour)}
          placeholderTextColor={colors.gray}
        />
        <TextInput
          style={style.textInput}
          placeholder="MM"
          keyboardType="number-pad"
          defaultValue={props.min}
          onEndEditing={e => props.onChangeText(e.nativeEvent.text, Time.Min)}
          placeholderTextColor={colors.gray}
        />
        <TextInput
          style={style.textInput}
          placeholder="SS"
          keyboardType="number-pad"
          defaultValue={props.sec}
          onEndEditing={e => props.onChangeText(e.nativeEvent.text, Time.Sec)}
          placeholderTextColor={colors.gray}
        />
      </View>
      <TouchableOpacity
        style={style.startButtonContainer}
        onPress={() => props.saveTimer()}>
        <Text style={style.startTimer}>Save Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerInput;

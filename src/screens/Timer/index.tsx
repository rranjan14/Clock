/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useState} from 'react';
import {View, useWindowDimensions, FlatList, Alert} from 'react-native';

import TimerCard from '../../components/TimerCard';
import {TimerContext} from '../../context/timer';
import {timeInSeconds} from '../../util/helper';
import {Time} from '../../util/types';
import styles from './style';
import TimerInput from './TimerInput';

const Timer = () => {
  const {height, width} = useWindowDimensions();
  const {createTimer, deleteTimer, getTimer, getTimers, updateTimer} =
    useContext(TimerContext);
  const style = styles(height, width);
  const [hour, setHour] = useState<string>('00');
  const [min, setMin] = useState<string>('00');
  const [sec, setSec] = useState<string>('00');

  const onChangeText = (text: string, type: Time) => {
    if (isNaN(+text)) {
      Alert.alert('Error', 'Please enter a valid number');
      return;
    }
    const number = +text;
    if (type === Time.Hour) {
      setHour(number.toString().padStart(2, '0'));
    } else if (type === Time.Min) {
      setMin(number.toString().padStart(2, '0'));
    } else if (type === Time.Sec) {
      setSec(number.toString().padStart(2, '0'));
    }
  };

  const onDeleteTimer = (timerId: string) => {
    deleteTimer(timerId);
  };

  const onStartTimer = (timerId: string) => {
    const timer = getTimer(timerId);
    if (timer) {
      updateTimer(timerId, {
        ...timer,
        running: true,
        startFrom: Date.now(),
      });
    }
  };

  const onStopTimer = (timerId: string) => {
    const timer = getTimer(timerId);
    if (timer) {
      updateTimer(timerId, {...timer, running: false});
    }
  };

  const onCreateTimer = () => {
    const seconds = timeInSeconds({
      hours: hour,
      mins: min,
      secs: sec,
    });
    createTimer(seconds);
    setHour('00');
    setMin('00');
    setSec('00');
  };

  return (
    <View style={style.container}>
      <FlatList
        data={getTimers()}
        style={style.flatListContainer}
        ListHeaderComponent={() => (
          <TimerInput
            height={height}
            width={width}
            hour={hour}
            min={min}
            sec={sec}
            onChangeText={onChangeText}
            saveTimer={onCreateTimer}
          />
        )}
        stickyHeaderIndices={[0]}
        renderItem={({item}) => (
          <TimerCard
            height={height}
            width={width}
            timer={item}
            onStart={onStartTimer}
            onStop={onStopTimer}
            deleteTimer={onDeleteTimer}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Timer;

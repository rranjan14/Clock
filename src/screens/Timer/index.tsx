import React, {useEffect, useState} from 'react';
import {View, useWindowDimensions, FlatList} from 'react-native';
import {v4 as uuidv4} from 'uuid';

import FloatingActionButton from '../../components/FloatingActionButton';
import TimerCard, {
  ComponentType,
  Time,
  TimerCardProps,
} from '../../components/TimerCard';
import styles from './style';

const Timer = () => {
  const {height, width} = useWindowDimensions();
  const style = styles(height, width);
  const [timers, setTimers] = useState<TimerCardProps[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimersList = timers.map(t =>
        t.isPlaying
          ? {
              ...t,
              initialTime: Math.max(0, t.initialTime - 1),
              isPlaying: t.initialTime === 0 ? false : t.isPlaying,
            }
          : t,
      );
      setTimers(newTimersList);
    }, 1000);
    return () => clearInterval(timer);
  }, [timers]);

  const createNewTimer = () => {
    setTimers(prev => [
      ...prev,
      {
        id: uuidv4(),
        componentType: ComponentType.Input,
        height: height,
        width: width,
        hour: 0,
        initialTime: 0,
        isPlaying: false,
        min: 0,
        sec: 0,
        onChangeText: onChangeText,
        startTimer: startButtonPress,
        updateTimer: updateTimer,
        deleteTimer: deleteTimer,
      },
    ]);
  };

  const onChangeText = (text: string, type: Time, id: string) => {
    const currentTimerIndex = timers.findIndex(timer => timer.id === id);
    let currentTimer = timers[currentTimerIndex];
    let newTimersList = [...timers];
    if (currentTimer) {
      if (type === Time.Hour) {
        if (+text <= 23 && +text >= 0) {
          currentTimer = {...currentTimer, hour: +text};
          newTimersList[currentTimerIndex] = currentTimer;
          setTimers(newTimersList);
        }
      } else if (type === Time.Min) {
        if (+text <= 59 && +text >= 0) {
          currentTimer = {...currentTimer, min: +text};
          newTimersList[currentTimerIndex] = currentTimer;
          setTimers(newTimersList);
        }
      } else if (type === Time.Sec) {
        if (+text <= 59 && +text >= 0) {
          currentTimer = {...currentTimer, sec: +text};
          newTimersList[currentTimerIndex] = currentTimer;
          setTimers(newTimersList);
        }
      }
    }
  };

  const updateTimer = (id: string, currentTime: number) => {
    const currentTimerIndex = timers.findIndex(timer => timer.id === id);
    let currentTimer = timers[currentTimerIndex];
    let newTimersList = [...timers];
    currentTimer = {...currentTimer, initialTime: currentTime};
    newTimersList[currentTimerIndex] = currentTimer;
    setTimers(newTimersList);
  };

  const startButtonPress = (id: string) => {
    const currentTimerIndex = timers.findIndex(timer => timer.id === id);
    let currentTimer = timers[currentTimerIndex];
    let newTimersList = [...timers];

    const finalTime =
      currentTimer.initialTime === 0
        ? currentTimer.hour * 60 * 60 + currentTimer.min * 60 + currentTimer.sec
        : currentTimer.initialTime;
    currentTimer = {
      ...currentTimer,
      initialTime: finalTime,
      componentType: ComponentType.Timer,
      isPlaying: !currentTimer.isPlaying,
    };
    newTimersList[currentTimerIndex] = currentTimer;

    setTimers(newTimersList);
  };

  const deleteTimer = (id: string) => {
    let newTimersList = timers.filter(t => t.id !== id);
    setTimers(newTimersList);
  };

  return (
    <View style={style.container}>
      <FloatingActionButton
        height={height}
        width={width}
        onPress={createNewTimer}
      />
      <FlatList
        data={timers}
        style={style.flatListContainer}
        renderItem={({item}) => (
          <TimerCard
            height={height}
            width={width}
            componentType={item.componentType}
            hour={item.hour}
            isPlaying={item.isPlaying}
            min={item.min}
            sec={item.sec}
            onChangeText={onChangeText}
            id={item.id}
            initialTime={item.initialTime}
            startTimer={startButtonPress}
            updateTimer={updateTimer}
            deleteTimer={deleteTimer}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Timer;

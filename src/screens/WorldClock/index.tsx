import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, FlatList, useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {WorldClockContext} from '../../context/worldClock';

import Card from '../../components/Card';
import FloatingActionButton from '../../components/FloatingActionButton';

import styles from './style';
import {WorldClockStackScreens} from '../../navigation';
type WorldClockScreensProps = StackNavigationProp<
  WorldClockStackScreens,
  'WorldClock'
>;

const WorldClock = () => {
  const {height, width} = useWindowDimensions();
  const {localTimezoneDetails, savedTimezoneDetails, removeTimezone} =
    useContext(WorldClockContext);
  const navigation = useNavigation<WorldClockScreensProps>();

  const style = styles(height, width);

  const timer = useRef<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(
    localTimezoneDetails?.unixtime ?? Date.now() / 1000,
  );

  const onAddTimezone = () => {
    navigation.navigate('AddTimezone');
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      setCurrentTime(prev => prev + 1);
    }, 1000);
    return () => {
      timer.current = null;
    };
  }, []);

  return (
    <View style={style.container}>
      <FlatList
        style={style.flatListContainer}
        data={savedTimezoneDetails}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListHeaderComponent={() => (
          <Card
            height={height}
            width={width}
            timezone={localTimezoneDetails?.timezone ?? ''}
            utcOffset={localTimezoneDetails?.utc_offset ?? ''}
            currentTime={currentTime}
            showDeleteButton={false}
            onPress={() => {}}
          />
        )}
        keyExtractor={(item, index) => `${item.timezone}~${index}`}
        renderItem={({item}) => (
          <Card
            height={height}
            timezone={item.timezone}
            utcOffset={item.utc_offset}
            width={width}
            key={item.timezone}
            currentTime={currentTime}
            onPress={removeTimezone}
            showDeleteButton={true}
          />
        )}
      />
      <FloatingActionButton
        onPress={onAddTimezone}
        height={height}
        width={width}
      />
    </View>
  );
};

export default WorldClock;

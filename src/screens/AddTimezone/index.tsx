/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {WorldClockStackScreens} from '../../navigation';
import {WorldClockContext} from '../../context/worldClock';
import style from './style';
import {colors} from '../../util/constants';

type WorldClockScreensProps = StackNavigationProp<
  WorldClockStackScreens,
  'AddTimezone'
>;

type ListItem = {
  title: string;
  height: number;
  width: number;
  onPress: (tz: string) => void;
};

const ListItem: React.FC<ListItem> = React.memo(props => {
  const styles = style(props.height, props.width);
  return (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => props.onPress(props.title)}>
      <Text style={styles.listItemTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
});

const AddTimezone = () => {
  const {height, width} = useWindowDimensions();
  const {allAvailableTimezones, addTimezone, savedTimezoneDetails} =
    useContext(WorldClockContext);
  const navigation = useNavigation<WorldClockScreensProps>();

  const styles = style(height, width);

  const [query, setQuery] = useState('');

  const filterSearched = (text: string) => {
    if (text.length > 0) {
      const toReturn = allAvailableTimezones.filter(tz => {
        return tz.toLowerCase().includes(text.trim().toLowerCase());
      });
      return toReturn;
    } else {
      return allAvailableTimezones;
    }
  };

  const onItemPress = async (tz: string) => {
    const availableTimezone = savedTimezoneDetails.find(
      tzDetails => tzDetails.timezone === tz,
    );
    if (!availableTimezone) {
      await addTimezone(tz);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainerStyle}>
        <TextInput
          onChangeText={setQuery}
          value={query}
          placeholder={'Enter timezone...'}
          style={styles.input}
          placeholderTextColor={colors.gray}
        />
      </View>
      <FlatList
        data={filterSearched(query)}
        style={styles.flatListContainer}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <ListItem
            title={item}
            height={height}
            width={width}
            onPress={onItemPress}
          />
        )}
      />
    </View>
  );
};

export default AddTimezone;

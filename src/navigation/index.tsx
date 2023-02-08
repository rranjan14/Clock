import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {normalize} from '../util/helper';
import Timer from '../screens/Timer';
import WorldClock from '../screens/WorldClock';
import {colors} from '../util/constants';
import AddTimezone from '../screens/AddTimezone';

export type TimerStackScreens = {
  Timer: undefined;
};

export type WorldClockStackScreens = {
  WorldClock: undefined;
  AddTimezone: undefined;
};

const Tab = createBottomTabNavigator();
const TimerStackNavigator = createNativeStackNavigator<TimerStackScreens>();
const WorldClockStackNavigator =
  createNativeStackNavigator<WorldClockStackScreens>();

const getTabIcon = (color: string, size: number, routeName: string) => {
  switch (routeName) {
    case 'WorldClockRoot':
      return (
        <MaterialCommunityIcons
          name="clock-outline"
          size={size}
          color={color}
        />
      );
    case 'TimerRoot':
      return (
        <MaterialCommunityIcons
          name="timer-outline"
          size={size}
          color={color}
        />
      );
    default:
      return null;
  }
};

const WorldClockStack = () => {
  return (
    <WorldClockStackNavigator.Navigator
      initialRouteName="WorldClock"
      screenOptions={{
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: normalize(20),
          fontWeight: '400',
          color: colors.primary,
        },
      }}>
      <WorldClockStackNavigator.Screen
        name="WorldClock"
        component={WorldClock}
        options={{
          title: 'World Clock',
        }}
      />
      <WorldClockStackNavigator.Screen
        name="AddTimezone"
        component={AddTimezone}
        options={{
          title: 'Add Timezone',
        }}
      />
    </WorldClockStackNavigator.Navigator>
  );
};

const TimerStack = () => {
  return (
    <TimerStackNavigator.Navigator
      initialRouteName="Timer"
      screenOptions={{
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: normalize(20),
          fontWeight: '400',
          color: colors.primary,
        },
      }}>
      <TimerStackNavigator.Screen name="Timer" component={Timer} />
    </TimerStackNavigator.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.darkBackground,
        tabBarInactiveTintColor: colors.gray,
        tabBarLabelStyle: {
          fontSize: normalize(10),
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="TimerRoot"
        component={TimerStack}
        options={({route}) => ({
          title: 'Timer',
          tabBarIcon: ({size, color}) => getTabIcon(color, size, route.name),
        })}
      />
      <Tab.Screen
        name="WorldClockRoot"
        component={WorldClockStack}
        options={({route}) => ({
          title: 'World Clock',
          tabBarIcon: ({size, color}) => getTabIcon(color, size, route.name),
        })}
      />
    </Tab.Navigator>
  );
};

export default function NavigationRoot() {
  return Platform.OS === 'ios' ? (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  ) : (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

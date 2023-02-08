import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {ApiContext, standardApiClient} from './context/api';
import {TimerContextProvider} from './context/timer';
import {WorldClockContextProvider} from './context/worldClock';
import NavigationRoot from './navigation';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ApiContext.Provider value={standardApiClient}>
      <WorldClockContextProvider>
        <TimerContextProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <NavigationRoot />
        </TimerContextProvider>
      </WorldClockContextProvider>
    </ApiContext.Provider>
  );
}

export default App;

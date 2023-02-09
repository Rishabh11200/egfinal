import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {mainPersist, store} from './src/store';
import {PersistGate} from 'redux-persist/es/integration/react';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PersistGate persistor={mainPersist} loading={null}>
          <SafeAreaProvider>
            <NavigationStack />
          </SafeAreaProvider>
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

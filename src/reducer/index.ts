import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import userReducer from './userCredentials';
import customerReducer from './customer';
import mainOrderReducer from './mainOrder';
import workerReducer from './worker';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  userReducer: userReducer,
  customerReducer: customerReducer,
  workerReducer: workerReducer,
  mainOrderReducer: mainOrderReducer,
});
export const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
) as typeof rootReducer;
export * from './userCredentials';
export * from './customer';
export * from './worker';
export * from './mainOrder';

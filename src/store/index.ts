import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {persistedReducer} from '../reducer';
import logger from 'redux-logger';
import persistStore from 'redux-persist/es/persistStore';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

export const mainPersist = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

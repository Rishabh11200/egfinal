import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MainOrderType} from '../interfaces';
import {RootState} from '../store';

export interface mainOrderData {
  mainOrderAllData: Array<MainOrderType> | null;
}

const initialState: mainOrderData = {
  mainOrderAllData: null,
};

export const mainOrderSlice = createSlice({
  name: 'mainOrderData',
  initialState,
  reducers: {
    insertmainOrderData: (state, action: PayloadAction<mainOrderData>) => {
      state.mainOrderAllData = action.payload.mainOrderAllData;
    },
    resetMainOrderData: () => initialState,
  },
});
export const {insertmainOrderData, resetMainOrderData} = mainOrderSlice.actions;
export const mainOrderAllData = (state: RootState) =>
  state.mainOrderReducer.mainOrderAllData;
export default mainOrderSlice.reducer;

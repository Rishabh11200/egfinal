import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {workerDataType} from '../interfaces';
import {RootState} from '../store';

export interface workerData {
  workerAllData: Array<workerDataType> | null;
}

const initialState: workerData = {
  workerAllData: null,
};

export const workerSlice = createSlice({
  name: 'workerData',
  initialState,
  reducers: {
    insertWorkerData: (state, action: PayloadAction<workerData>) => {
      state.workerAllData = action.payload.workerAllData;
    },
    resetWorkerData: () => initialState,
  },
});
export const {insertWorkerData, resetWorkerData} = workerSlice.actions;
export const workerAllData = (state: RootState) =>
  state.workerReducer.workerAllData;
export default workerSlice.reducer;

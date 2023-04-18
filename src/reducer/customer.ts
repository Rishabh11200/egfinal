import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {customerDataType} from '../interfaces';
import {RootState} from '../store';

export interface customerData {
  customerAllData: Array<customerDataType> | null;
}

const initialState: customerData = {
  customerAllData: null,
};

export const customerSlice = createSlice({
  name: 'customerData',
  initialState,
  reducers: {
    insertCustData: (state, action: PayloadAction<customerData>) => {
      state.customerAllData = action.payload.customerAllData;
    },
    resetCustData: () => initialState,
  },
});
export const {insertCustData, resetCustData} = customerSlice.actions;
export const customerAllData = (state: RootState) =>
  state.customerReducer.customerAllData;
export default customerSlice.reducer;

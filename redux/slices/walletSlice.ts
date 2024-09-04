import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MMEvent, MMEventDetails, Poap } from '@utils/types';

interface WalletState {
  balance?: number;
  collectedPoaps?: Poap[];
  attendingEvents?: MMEventDetails[];
}

const initialState: WalletState = {
  balance: undefined,
  collectedPoaps: undefined,
  attendingEvents: undefined,
};
export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number | undefined>) => {
      state.balance = action.payload;
    },
    setCollectedPoaps: (state, action: PayloadAction<Poap[] | undefined>) => {
      state.collectedPoaps = action.payload;
    },
    setAttendingEvents: (state, action: PayloadAction<MMEventDetails[]>) => {
      state.attendingEvents = action.payload;
    },
    addAttendingEvents: (state, action: PayloadAction<MMEventDetails>) => {
      state.attendingEvents?.push(action.payload);
    },
    deleteAttendingEvents: (state, action: PayloadAction<string>) => {
      state.attendingEvents?.filter((event) => event._id !== action.payload);
    },
    resetWallet: (state) => {
      state = initialState;
    },
  },
});

export const {
  setBalance,
  setCollectedPoaps,
  setAttendingEvents,
  addAttendingEvents,
  resetWallet,
} = walletSlice.actions;
export default walletSlice.reducer;

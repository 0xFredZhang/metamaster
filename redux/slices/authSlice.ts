import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface JWT {
  token: string;
}

export interface authState {
  jwt?: string;
  email?: string;
  walletAddress?: string;
  username?: string;
  profilePicture?: string;
}

const initialState: authState = {
  jwt: undefined,
  email: undefined,
  walletAddress: undefined,
  username: undefined,
  profilePicture: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setJWT: (state, action: PayloadAction<string | undefined>) => {
      state.jwt = action.payload;
    },
    setUsername: (state, action: PayloadAction<string | undefined>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string | undefined>) => {
      state.email = action.payload;
    },
    setWalletAddress: (state, action: PayloadAction<string | undefined>) => {
      state.walletAddress = action.payload;
    },
    setProfilePicture: (state, action: PayloadAction<string | undefined>) => {
      state.profilePicture = action.payload;
    },
    resetAuth: (state) => {
      state = initialState;
    },
  },
});

export const {
  setJWT,
  setUsername,
  setEmail,
  setWalletAddress,
  setProfilePicture,
  resetAuth,
} = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isAuth: boolean;
  uid: string;
  role: string;
  name: string;


};

const initialState: AuthState = {
  isAuth: false,
  uid: "",
  role: "",
  name: "",

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },

    logIn: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;

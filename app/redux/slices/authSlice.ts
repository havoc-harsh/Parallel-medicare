import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Patient {
  id: string;
  fullName: string;
  email: string;
  token: string;
}

interface AuthState {
  patient: Patient | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  patient: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.patient = null;
      state.isAuthenticated = false;
    },
    signup : (state,action)=>{
        state.patient = action.payload;
    },
  },
});

export const { login, logout , signup } = authSlice.actions;
export const authReducer = authSlice.reducer;

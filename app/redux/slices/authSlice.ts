// app/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Hospital {
  user: HospitalUser;
  token: string;
  error?: string | null; // Added error field
}

type HospitalUser = {
  name: string;
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
  licenseNumber: string;
  password: string;
  error?: string | null; // Optional error field in user
};

const initialState: Hospital = {
  user: {
    name: "",
    address: "",
    contactPerson: "",
    phone: "",
    email: "",
    licenseNumber: "",
    password: "",
  },
  token: "",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<HospitalUser>) {
      state.user = action.payload;
      state.error = action.payload.error || null; // Set error if present
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    clearAuth(state) {
      state.user = initialState.user;
      state.token = "";
      state.error = null; // Reset error
    },
    setError(state, action: PayloadAction<string | null>) { // New action for errors
      state.error = action.payload;
    },
  },
});

export const { setUser, setToken, clearAuth, setError } = authSlice.actions;
export default authSlice.reducer;
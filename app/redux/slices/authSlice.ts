import { createSlice } from "@reduxjs/toolkit";
interface Hospital {
  user: HospitalUser;
  token: string;
}

type HospitalUser = {
  name: string;
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
  licenseNumber: string;
  password: string;
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
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearAuth(state) {
      state.user = {
        name: "",
        address: "",
        contactPerson: "",
        phone: "",
        email: "",
        licenseNumber: "",
        password: "",
      };
      state.token = "";
    },
  },
});

export const { setUser, setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;

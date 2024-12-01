import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from 'jwt-decode';

const initialState = {

  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {

      state.currentUser = action.payload.user;
    },
    loginSuccess: (state, action) => {
      console.log("Payload received in loginSuccess:", action.payload);
      // state.currentUser = action.payload.user;
       console.log(action.payload.user);
       console.log(action.payload.jwtToken);
      localStorage.setItem("Mossa-Melt-token", action.payload.jwtToken);
      console.log(action.payload.jwtToken);
      const tokenParts=action.payload.jwtToken.split('.');
      const encodedPayload=tokenParts[1];
      const decodedPayload=JSON.parse(atob(encodedPayload));
      // state.currentUser = jwtDecode(action.payload.jwtToken);

      state.currentUser = {
        ...decodedPayload,
        token: action.payload.jwtToken, // You might want to store the token as well
        role: decodedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
         id: decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      
      };
    
      console.log("Current User:", state.currentUser.FirstName);

    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("Mossa-Melt-token");
    },
  },
});

export const { updateUser, loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;

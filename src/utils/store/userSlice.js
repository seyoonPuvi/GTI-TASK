import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
  },

  reducers: {
    addUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },

    logoutUser: (state) => {
      state.userDetails = null;
    },
    addTransaction: (state, action) => {
      state.userDetails.transactionsList = [
        action.payload,
        ...state.userDetails.transactionsList,
      ];
    },

    clearTransactions: (state) => {
      state.userDetails.transactionsList = [];
    },
    addLoggedUserEmailId: (state, action) => {
      state.loggedUserEmailId = action.payload;
    },
  },
});

export const {
  addUserDetails,
  logoutUser,
  addTransaction,
  clearTransactions,
  addLoggedUserEmailId,
} = userSlice.actions;

export default userSlice.reducer;

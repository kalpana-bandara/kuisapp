import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setUserImage(state, action) {
      state.userImage = action.payload;
    },
  },
});

export const { setUserId, setUserImage, setUserName } = userSlice.actions;

export default userSlice.reducer;

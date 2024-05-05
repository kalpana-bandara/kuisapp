import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wrongCount: 0,
  rightCount: 0,
  questionsCount: 0,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setIncorrectCount(state, action) {
      state.wrongCount = action.payload;
    },
    setCorrectCount(state, action) {
      state.rightCount = action.payload;
    },
    setQuestionsCount(state, action) {
      state.questionsCount = action.payload;
    },
  },
});

export const { setCorrectCount, setIncorrectCount, setQuestionsCount } = resultsSlice.actions;

export default resultsSlice.reducer;

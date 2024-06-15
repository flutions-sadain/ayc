import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resumeData: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumeData(state, action) {
      state.resumeData = action.payload;
    },
  },
});

export const { setResumeData } = resumeSlice.actions;

export default resumeSlice.reducer;

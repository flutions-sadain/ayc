import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resumeData: null,
};

const skillTestSlice = createSlice({
  name: 'skillTest',
  initialState,
  reducers: {
    setSkillTestData(state, action) {
      state.skillTestData = action.payload;
    },
  },
});

export const { setSkillTestData } = skillTestSlice.actions;

export default skillTestSlice.reducer;

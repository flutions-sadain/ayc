import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import resumeReducer from './slices/resumeSlice';
import skillTestSlice from './slices/skillTestSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    resume: resumeReducer,
    skillTest: skillTestSlice,
  },
  devTools: true,
});

export default store;

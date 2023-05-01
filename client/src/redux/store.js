import { configureStore } from '@reduxjs/toolkit';
// PROJECT IMPORTS
import greenhouseReducer from './greenhouseSlice';

export const store = configureStore({
  reducer: {
    greenhouse: greenhouseReducer,
  },
});

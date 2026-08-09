import { configureStore } from '@reduxjs/toolkit';
import siteReducer from '../features/site/siteSlice';

export const store = configureStore({
  reducer: {
    site: siteReducer,
  },
});

// store.js
import { configureStore } from '@reduxjs/toolkit';
import reducerReducer from './reducer';

const store = configureStore({
  reducer: {
    reducer: reducerReducer,
  },
  // Additional middleware or options can be added here
});

export default store;

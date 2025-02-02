import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import api from './api';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getdefaultMiddleware) => getdefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;

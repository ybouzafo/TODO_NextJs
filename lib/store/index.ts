// lib/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    // Si vous aviez d'autres slices Redux, ils seraient ajoutés ici
  },
});

// Types pour le RootState et le Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
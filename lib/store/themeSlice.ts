// lib/store/themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  // Initialiser à partir du localStorage pour persister le choix de l'utilisateur
  // Par défaut, le mode sombre sera activé si le localStorage ne contient rien ou est 'true'
  isDarkMode: typeof window !== 'undefined'
    ? localStorage.getItem('theme') === 'true'
    : false, // Valeur par défaut pour le SSR
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Persister le choix dans le localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.isDarkMode.toString());
      }
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.isDarkMode.toString());
      }
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
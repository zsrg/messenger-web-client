import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../../types/settings";

export interface SettingsState {
  theme: Theme;
}

const saveTheme = (theme: Theme) => localStorage.setItem("theme", theme);
const getSavedTheme = () => (localStorage.getItem("theme") as Theme) || Theme.Dark;

const initialState: SettingsState = {
  theme: getSavedTheme(),
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state: SettingsState, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      saveTheme(action.payload);
    },
  },
});

export const { setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;

import notificationsReducer from "./slices/notifications";
import settingsReducer from "./slices/settings";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    settings: settingsReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

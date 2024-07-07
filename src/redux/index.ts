import contactsReducer from "./slices/contacts";
import dialogsReducer from "./slices/dialogs";
import messagesReducer from "./slices/messages";
import notificationsReducer from "./slices/notifications";
import settingsReducer from "./slices/settings";
import userReducer from "./slices/user";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

const combinedReducer = combineReducers({
  contacts: contactsReducer,
  dialogs: dialogsReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
  settings: settingsReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.payload?.status === 401) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import attachmentsSlice from "./slices/attachments";
import contactsReducer from "./slices/contacts";
import dialogsReducer from "./slices/dialogs";
import listenerReducer from "./listener";
import messagesReducer from "./slices/messages";
import notificationsReducer from "./slices/notifications";
import settingsReducer from "./slices/settings";
import userReducer from "./slices/user";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

const combinedReducer = combineReducers({
  attachments: attachmentsSlice,
  contacts: contactsReducer,
  dialogs: dialogsReducer,
  listener: listenerReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
  settings: settingsReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/deleteSession/fulfilled" || action.payload?.status === 401) {
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

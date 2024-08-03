import * as listenerServices from "../services/listener";
import { addDialogUpdate, deleteDialogUpdate } from "./slices/dialogs";
import { addMessageUpdate } from "./slices/messages";
import { addSessionUpdate, changeLoginUpdate, changeNameUpdate, deleteSession, deleteSessionUpdate } from "./slices/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DialogData } from "../types/dialogs";
import { MessageData } from "../types/messages";
import { RootState } from ".";
import { SessionData } from "../types/user";

export enum Updates {
  NewSession = "NEW_SESSION",
  DeleteSession = "DELETE_SESSION",
  UpdateName = "UPDATE_NAME",
  UpdateLogin = "UPDATE_LOGIN",
  NewDialog = "NEW_DIALOG",
  DeleteDialog = "DELETE_DIALOG",
  NewMessage = "NEW_MESSAGE",
}

export interface SubscribeEventData {
  type: Updates;
  data: SessionData | DialogData | MessageData | string | number;
}

export interface ListenerState {
  isConnectionError: boolean;
}

const initialState: ListenerState = {
  isConnectionError: false,
};

export const subscribe = createAsyncThunk<void, void>(
  "subscribe/subscribe",
  async (_: void, { dispatch, getState }) => {
    const eventSource = listenerServices.subscribe();

    eventSource.onopen = () => {
      const { isConnectionError } = (getState() as RootState).listener;

      if (isConnectionError) {
        dispatch(deleteSession());
      }
    };

    eventSource.onerror = () => {
      dispatch(setConnectionError(true));
    };

    eventSource.onmessage = (event: MessageEvent) => {
      const { type, data }: SubscribeEventData = event?.data ? JSON.parse(event.data) : {};

      switch (type) {
        case Updates.NewSession: {
          dispatch(addSessionUpdate(data as SessionData));
          return;
        }
        case Updates.DeleteSession: {
          dispatch(deleteSessionUpdate(data as string));
          return;
        }
        case Updates.UpdateName: {
          dispatch(changeNameUpdate(data as string));
          return;
        }
        case Updates.UpdateLogin: {
          dispatch(changeLoginUpdate(data as string));
          return;
        }
        case Updates.NewDialog: {
          dispatch(addDialogUpdate(data as DialogData));
          return;
        }
        case Updates.DeleteDialog: {
          dispatch(deleteDialogUpdate(data as number));
          return;
        }
        case Updates.NewMessage: {
          dispatch(addMessageUpdate(data as MessageData));
          return;
        }
      }
    };
  }
);

export const listenerSlice = createSlice({
  name: "listener",
  initialState,
  reducers: {
    setConnectionError: (state: ListenerState, action: PayloadAction<boolean>) => {
      state.isConnectionError = action.payload;
    },
  },
});

export const { setConnectionError } = listenerSlice.actions;

export default listenerSlice.reducer;

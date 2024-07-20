import * as listenerServices from "../services/listener";
import { addDialogUpdate, deleteDialogUpdate } from "./slices/dialogs";
import { addMessageUpdate } from "./slices/messages";
import { addSessionUpdate, changeLoginUpdate, changeNameUpdate, deleteSessionUpdate } from "./slices/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DialogData } from "../types/dialogs";
import { MessageData } from "../types/messages";
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

interface SubscribeEventData {
  type: Updates;
  data: SessionData | DialogData | MessageData | string | number;
}

export const subscribe = createAsyncThunk<void, void>(
  "subscribe/subscribe",
  async (_: void, { dispatch }) => {
    listenerServices.subscribe().onmessage = (event: MessageEvent) => {
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

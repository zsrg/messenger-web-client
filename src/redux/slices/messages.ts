import * as messagesServices from "../../services/messages";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageData } from "../../types/messages";
import { ResponseError } from "../../services";

export interface MessagesState {
  lastMessages: Map<number, MessageData>;
  messages: Map<number, MessageData[]>;
}

const initialState: MessagesState = {
  lastMessages: new Map(),
  messages: new Map(),
};

export const getLastMessages = createAsyncThunk<Map<number, MessageData>, number[]>(
  "messages/getLastMessages",
  async (dialogs: number[], { fulfillWithValue }) => {
    const result = await new Promise<Map<number, MessageData>>((resolve) => {
      const lastMessages = new Map();

      dialogs.forEach((dialogId: number, i: number) => {
        messagesServices
          .getMessages(dialogId, 1)
          .then((data: MessageData[]) => {
            lastMessages.set(dialogId, data[0]);
          })
          .finally(() => {
            if (i === dialogs.length - 1) {
              resolve(lastMessages);
            }
          });
      });
    });

    return fulfillWithValue(result);
  }
);

export const getMessages = createAsyncThunk<MessageData[], number>(
  "messages/getMessages",
  async (dialogId: number, { rejectWithValue }) =>
    messagesServices
      .getMessages(dialogId)
      .catch((error: ResponseError) => rejectWithValue(error))
);

export const deleteDialogMessages = createAsyncThunk<number, number>(
  "messages/deleteDialogMessages",
  async (dialogId: number, { fulfillWithValue, rejectWithValue }) =>
    await messagesServices
      .deleteDialogMessages(dialogId)
      .then(() => fulfillWithValue(dialogId))
      .catch((error: ResponseError) => rejectWithValue(error))
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getLastMessages.fulfilled,
      (state: MessagesState, action: PayloadAction<Map<number, MessageData>>) => {
        state.lastMessages = action.payload;
      }
    );
    builder.addCase(
      getMessages.fulfilled,
      (state, action: PayloadAction<MessageData[]>) => {
        const { dialogId } = action.payload[0] || {};
        state.messages.set(dialogId, action.payload);
      }
    );
    builder.addCase(
      deleteDialogMessages.fulfilled,
      (state: MessagesState, action: PayloadAction<number>) => {
        state.messages.delete(action.payload);
      }
    );
  },
});

export default messagesSlice.reducer;

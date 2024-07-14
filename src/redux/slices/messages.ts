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
    const lastMessages = new Map();

    const result = await new Promise<Map<number, MessageData>>((resolve) => {
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
      deleteDialogMessages.fulfilled,
      (state: MessagesState, action: PayloadAction<number>) => {
        state.messages.delete(action.payload);
      }
    );
  },
});

export default messagesSlice.reducer;

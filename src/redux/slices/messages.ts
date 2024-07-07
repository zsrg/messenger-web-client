import * as messagesServices from "../../services/messages";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageData } from "../../types/messages";

export interface MessagesState {
  lastMessages: Map<number, MessageData>;
}

const initialState: MessagesState = {
  lastMessages: new Map(),
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
  },
});

export default messagesSlice.reducer;

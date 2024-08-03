import * as messagesServices from "../../services/messages";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetMessagesData, GetMessagesParams, MessageData, MessageInfoData, SendMessageData } from "../../types/messages";
import { MESSAGES_UPLOAD_LIMIT } from "../../constants";
import { ResponseError } from "../../services";

export interface MessagesState {
  lastMessages: Map<number, MessageData>;
  messages: Map<number, MessageData[]>;
  messagesInfo: Map<number, MessageInfoData>;
}

const initialState: MessagesState = {
  lastMessages: new Map(),
  messages: new Map(),
  messagesInfo: new Map(),
};

export const sendMessage = createAsyncThunk<MessageData, SendMessageData>(
  "messages/sendMessage",
  async (sendMessageData: SendMessageData, { rejectWithValue }) =>
    await messagesServices
      .sendMessage(sendMessageData)
      .catch((error: ResponseError) => rejectWithValue(error))
);

export const getLastMessages = createAsyncThunk<Map<number, MessageData>, number[]>(
  "messages/getLastMessages",
  async (dialogs: number[], { fulfillWithValue }) => {
    const result = await new Promise<Map<number, MessageData>>(
      async (resolve) => {
        const lastMessages = new Map();

        for (let i = 0; i < dialogs.length; i++) {
          await messagesServices
            .getMessages(dialogs[i], -1, 1)
            .then((data: MessageData[]) => {
              lastMessages.set(dialogs[i], data[0]);
            })
            .finally(() => {
              if (i === dialogs.length - 1) {
                resolve(lastMessages);
              }
            });
        }
      }
    );

    return fulfillWithValue(result);
  }
);

export const getMessages = createAsyncThunk<GetMessagesData, GetMessagesParams>(
  "messages/getMessages",
  async ({ dialogId, sinceId }, { fulfillWithValue, rejectWithValue }) =>
    messagesServices
      .getMessages(dialogId, sinceId, MESSAGES_UPLOAD_LIMIT)
      .then((data: MessageData[]) => fulfillWithValue({ dialogId, data }))
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
  reducers: {
    addMessageUpdate: (state: MessagesState, action: PayloadAction<MessageData>) => {
      const { dialogId } = action.payload;
      if (state.messages.has(dialogId)) {
        const messages = state.messages.get(dialogId);
        state.messages.set(dialogId, [...messages, action.payload]);
      }
      state.lastMessages.set(dialogId, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      sendMessage.fulfilled,
      (state: MessagesState, action: PayloadAction<MessageData>) => {
        const { dialogId } = action.payload;
        if (!state.messages.has(dialogId)) {
          state.messages.set(dialogId, [action.payload]);
        } else {
          state.messages.get(dialogId).push(action.payload);
        }
        state.lastMessages.set(dialogId, action.payload);
      }
    );
    builder.addCase(
      getLastMessages.fulfilled,
      (state: MessagesState, action: PayloadAction<Map<number, MessageData>>) => {
        state.lastMessages = action.payload;
      }
    );
    builder.addCase(
      getMessages.fulfilled,
      (state, action: PayloadAction<GetMessagesData>) => {
        const { dialogId, data } = action.payload || {};

        if (data.length) {
          if (state.messages.has(dialogId)) {
            state.messages.get(dialogId).unshift(...(data || []));
          } else {
            state.messages.set(dialogId, data);
          }
        } else {
          state.messagesInfo.set(dialogId, { isAllLoaded: true });
        }
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

export const { addMessageUpdate } = messagesSlice.actions;

export default messagesSlice.reducer;

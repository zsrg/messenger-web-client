import * as attachmentsServices from "../../services/attachments";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAttachmentData } from "../../types/attachments";
import { ResponseError } from "../../services";

export interface AttachmentsState {
  attachments: Map<number, string>;
}

const initialState: AttachmentsState = {
  attachments: new Map(),
};

export const getAttachment = createAsyncThunk<GetAttachmentData, number>(
  "contacts/getAttachment",
  async (attachmentId: number, { fulfillWithValue, rejectWithValue }) =>
    await attachmentsServices
      .getAttachment(attachmentId)
      .then((data: Blob) => fulfillWithValue({ attachmentId, data: URL.createObjectURL(data) }))
      .catch((error: ResponseError) => rejectWithValue(error))
);

export const attachmentsSlice = createSlice({
  name: "attachments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAttachment.fulfilled,
      (state: AttachmentsState, action: PayloadAction<GetAttachmentData>) => {
        const { attachmentId, data } = action.payload;
        state.attachments.set(attachmentId, data);
      }
    );
  },
});

export default attachmentsSlice.reducer;

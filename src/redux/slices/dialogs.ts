import * as dialogsServices from "../../services/dialogs";
import { addNotification } from "./notifications";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateDialogData, DialogData } from "../../types/dialogs";
import { NotificationType } from "../../types/notifications";
import { ResponseError } from "../../services";
import { t } from "i18next";

export interface DialogsState {
  selectedDialog: number;
  dialogs: DialogData[];
  filter: string;
}

const initialState: DialogsState = {
  selectedDialog: null,
  dialogs: [],
  filter: null,
};

export const createDialog = createAsyncThunk<DialogData, CreateDialogData>(
  "dialogs/createDialog",
  async (createDialogData: CreateDialogData, { dispatch, rejectWithValue }) =>
    await dialogsServices
      .creteDialog(createDialogData)
      .catch((e: ResponseError) => {
        dispatch(addNotification({ type: NotificationType.Error, text: t("messengerPage.messages.createDialogError") }));
        return rejectWithValue(e);
      })
);

export const getDialogs = createAsyncThunk<DialogData[], void>(
  "dialogs/getDialogs",
  async (_: void, { rejectWithValue }) =>
    await dialogsServices
      .getDialogs()
      .catch((error: ResponseError) => rejectWithValue(error))
);

export const deleteDialog = createAsyncThunk<number, number>(
  "dialogs/deleteDialog",
  async (dialogId: number, { dispatch, fulfillWithValue, rejectWithValue }) =>
    await dialogsServices
      .deleteDialog(dialogId)
      .then(() => fulfillWithValue(dialogId))
      .catch((error: ResponseError) => {
        dispatch(addNotification({ type: NotificationType.Error, text: t("messengerPage.messages.deleteDialogError") }));
        return rejectWithValue(error);
      })
);

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    selectDialog: (state: DialogsState, action: PayloadAction<number>) => {
      state.selectedDialog = action.payload;
    },
    setFilter: (state: DialogsState, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    addDialogUpdate: (state: DialogsState, action: PayloadAction<DialogData>) => {
      state.dialogs.push(action.payload);
    },
    deleteDialogUpdate: (state: DialogsState, action: PayloadAction<number>) => {
      const index = state.dialogs.findIndex(((dialog: DialogData) => dialog.id === action.payload));
      if (index !== -1) {
        state.dialogs.splice(index, 1);
      }
      if (state.selectedDialog === action.payload) {
        state.selectedDialog = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createDialog.fulfilled,
      (state: DialogsState, action: PayloadAction<DialogData>) => {
        state.dialogs.push(action.payload);
        state.selectedDialog = action.payload.id;
      }
    );
    builder.addCase(
      getDialogs.fulfilled,
      (state: DialogsState, action: PayloadAction<DialogData[]>) => {
        state.dialogs = action.payload;
      }
    );
    builder.addCase(
      deleteDialog.fulfilled,
      (state, action: PayloadAction<number>) => {
        const index = state.dialogs.findIndex(((dialog: DialogData) => dialog.id === action.payload));
        if (index !== -1) {
          state.dialogs.splice(index, 1);
        }
        state.selectedDialog = null;
      }
    );
  },
});

export const { selectDialog, setFilter, addDialogUpdate, deleteDialogUpdate } = dialogsSlice.actions;

export default dialogsSlice.reducer;

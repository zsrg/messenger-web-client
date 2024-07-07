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
  },
});

export const { selectDialog, setFilter } = dialogsSlice.actions;

export default dialogsSlice.reducer;

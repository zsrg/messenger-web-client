import * as dialogsServices from "../../services/dialogs";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DialogData } from "../../types/dialogs";
import { ResponseError } from "../../services";

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
      getDialogs.fulfilled,
      (state: DialogsState, action: PayloadAction<DialogData[]>) => {
        state.dialogs = action.payload;
      }
    );
  },
});

export const { selectDialog, setFilter } = dialogsSlice.actions;

export default dialogsSlice.reducer;

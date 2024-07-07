import * as usersServices from "../../services/contacts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseError } from "../../services";
import { UserData } from "../../types/user";

export interface ContactsState {
  contacts: UserData[];
}

const initialState: ContactsState = {
  contacts: [],
};

export const getContacts = createAsyncThunk<UserData[], void>(
  "contacts/getContacts",
  async (_, { rejectWithValue }) =>
    await usersServices
      .getContacts()
      .catch((error: ResponseError) => rejectWithValue(error))
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getContacts.fulfilled,
      (state: ContactsState, action: PayloadAction<UserData[]>) => {
        state.contacts = action.payload;
      }
    );
  },
});

export default contactsSlice.reducer;

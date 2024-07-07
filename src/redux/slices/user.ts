import * as userServices from "../../services/user";
import { addNotification } from "./notifications";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateSessionData, SessionData, UserData } from "../../types/user";
import { NotificationType } from "../../types/notifications";
import { ResponseError } from "../../services";
import { t } from "i18next";

export interface UserState {
  sessionId: string;
  id: number;
  login: string;
  name: string;
}

const initialState: UserState = {
  sessionId: null,
  id: null,
  login: null,
  name: null,
};

export const createSession = createAsyncThunk<SessionData, CreateSessionData>(
  "user/createSession",
  async (createSessionData: CreateSessionData, { dispatch, rejectWithValue }) =>
    await userServices
      .createSession(createSessionData)
      .catch((e: ResponseError) => {
        if (e?.code === "INVALID_LOGIN_OR_PASSWORD") {
          dispatch(addNotification({ type: NotificationType.Error, text: t("loginPage.messages.invalidLoginOrPassword") }));
        } else {
          dispatch(addNotification({ type: NotificationType.Error, text: t("loginPage.messages.createSessionError") }));
        }
        return rejectWithValue(e);
      })
);

export const deleteSession = createAsyncThunk<void, void>(
  "user/deleteSession",
  async (_, { rejectWithValue }) =>
    await userServices
      .deleteSession()
      .catch((error: ResponseError) => rejectWithValue(error))
);

export const getUserData = createAsyncThunk<UserData, void>(
  "user/getUserData",
  async (_, { rejectWithValue }) =>
    userServices
      .getUserData()
      .catch((error: ResponseError) => rejectWithValue(error))
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      createSession.fulfilled,
      (state: UserState, action: PayloadAction<SessionData>) => {
        state.sessionId = action.payload.id;
      }
    );
    builder.addCase(
      deleteSession.fulfilled,
      (state: UserState) => {
        state.sessionId = null;
      }
    );
    builder.addCase(
      getUserData.fulfilled,
      (state: UserState, action: PayloadAction<UserData>) => {
        state.id = action.payload.id;
        state.login = action.payload.login;
        state.name = action.payload.name;
      }
    );
  },
});

export default userSlice.reducer;

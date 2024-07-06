import * as userServices from "../../services/user";
import { addNotification } from "./notifications";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateSessionData, SessionData } from "../../types/user";
import { NotificationType } from "../../types/notifications";
import { ResponseError } from "../../services";
import { t } from "i18next";

export interface UserState {
  sessionId: string;
}

const initialState: UserState = {
  sessionId: null,
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
  },
});

export default userSlice.reducer;

import * as userServices from "../../services/user";
import { addNotification } from "./notifications";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChangeLoginData, ChangeNameData, ChangePasswordData, CreateSessionData, SessionData, UserData } from "../../types/user";
import { NotificationType } from "../../types/notifications";
import { ResponseError } from "../../services";
import { t } from "i18next";

export interface UserState {
  sessionId: string;
  id: number;
  login: string;
  name: string;
  sessions: SessionData[];
}

const initialState: UserState = {
  sessionId: null,
  id: null,
  login: null,
  name: null,
  sessions: [],
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

export const getSessions = createAsyncThunk<SessionData[], void>(
  "user/getSessions",
  async (_: void, { rejectWithValue }) =>
    await userServices
      .getSessions()
      .catch((error: ResponseError) => rejectWithValue(error))
);

export const deleteSession = createAsyncThunk<string, string | void>(
  "user/deleteSession",
  async (session: string | void, { fulfillWithValue, rejectWithValue }) =>
    await userServices
      .deleteSession(session as string)
      .then(() => fulfillWithValue(session as string))
      .catch((error: ResponseError) => rejectWithValue(error))
);

export const getUserData = createAsyncThunk<UserData, void>(
  "user/getUserData",
  async (_, { rejectWithValue }) =>
    userServices
      .getUserData()
      .catch((error: ResponseError) => rejectWithValue(error))
);

export const changePassword = createAsyncThunk<void | any, ChangePasswordData>(
  "user/changePassword",
  async (changePasswordData: ChangePasswordData, { dispatch, rejectWithValue }) => {
    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      dispatch(addNotification({ type: NotificationType.Error, text: t("messengerPage.messages.newPasswordsDoNotMatch") }));
      return rejectWithValue(null);
    }

    delete changePasswordData.confirmPassword;

    return await userServices
      .changePassword(changePasswordData)
      .then(() => dispatch(addNotification({ type: NotificationType.Success, text: t("messengerPage.messages.passwordUpdatedSuccesfull") })))
      .catch((error: ResponseError) => {
        if (error?.code === "INVALID_PASSWORD") {
          dispatch(addNotification({ type: NotificationType.Error, text: t("messengerPage.messages.invalidPassword") }));
        } else if (error?.code === "SAME_PASSWORD") {
          dispatch(addNotification({ type: NotificationType.Error, text: t("messengerPage.messages.oldAndNewPasswordSame"), }));
        } else {
          dispatch(addNotification({ type: NotificationType.Error, text: t("messengerPage.messages.changePasswordError"), }));
        }
        return rejectWithValue(error);
      })
  }
);

export const changeName = createAsyncThunk<string, ChangeNameData>(
  "user/changeName",
  async (changeNameData: ChangeNameData, { dispatch, fulfillWithValue, rejectWithValue }) =>
    await userServices
      .changeName(changeNameData)
      .then(() => {
        dispatch(addNotification({ type: NotificationType.Success, text: t("messengerPage.messages.nameUpdatedSuccesfull") }));
        return fulfillWithValue(changeNameData.newName);
      })
      .catch((error: ResponseError) => {
        dispatch(addNotification({ type: NotificationType.Error, text: t("messengerPage.messages.changeNameError") }));
        return rejectWithValue(error);
      })
);

export const changeLogin = createAsyncThunk<string, ChangeLoginData>(
  "user/changeLogin",
  async (changeLoginData: ChangeLoginData, { dispatch, fulfillWithValue, rejectWithValue }) =>
    userServices
      .changeLogin(changeLoginData)
      .then(() => {
        dispatch(addNotification({ type: NotificationType.Success, text: t("messengerPage.messages.loginUpdatedSuccesfull") }));
        return fulfillWithValue(changeLoginData.newLogin);
      })
      .catch((error: ResponseError) => {
        if (error?.code === "SAME_LOGIN") {
          dispatch(addNotification({ type: NotificationType.Error, text: t("messengerPage.messages.oldAndNewLoginSame") }));
        } else if (error?.code === "LOGIN_EXISTS") {
          dispatch(addNotification({ type: NotificationType.Error, text: t("messengerPage.messages.loginAlreadyExists") }));
        } else {
          dispatch(addNotification({ type: NotificationType.Error, text: t("messengerPage.messages.changeLoginError"), }));
        }
        return rejectWithValue(error);
      })
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
      getSessions.fulfilled,
      (state: UserState, action: PayloadAction<SessionData[]>) => {
        state.sessions = action.payload;
      }
    );
    builder.addCase(
      deleteSession.fulfilled,
      (state: UserState, action: PayloadAction<string>) => {
        if (!action.payload || action.payload === state.sessionId) {
          state.sessionId = null;
        } else {
          const index = state.sessions.findIndex(((session: SessionData) => session.id === action.payload));
          if (index !== -1) {
            state.sessions.splice(index, 1);
          }
        }
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
    builder.addCase(
      changeName.fulfilled,
      (state: UserState, action: PayloadAction<string>) => {
        state.name = action.payload;
      }
    );
    builder.addCase(
      changeLogin.fulfilled,
      (state: UserState, action: PayloadAction<string>) => {
        state.login = action.payload;
      }
    );
  },
});

export default userSlice.reducer;

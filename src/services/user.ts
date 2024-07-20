import { ChangeLoginData, ChangeNameData, ChangePasswordData, CreateSessionData } from "../types/user";
import { RequestMethod, sendRequest } from ".";

export const createSession = async (createSessionData: CreateSessionData) =>
  await sendRequest({
    url: "/api/session",
    method: RequestMethod.POST,
    body: createSessionData,
  });

export const getSessions = async () =>
  await sendRequest({
    url: "/api/sessions",
  });

export const deleteSession = async (session?: string) =>
  await sendRequest({
    url: `/api/session${session ? `/${session}` : ""}`,
    method: RequestMethod.DELETE,
    keepalive: true,
  });

export const getUserData = async () =>
  await sendRequest({
    url: "/api/user",
  });

export const changePassword = async (changePasswordData: ChangePasswordData) =>
  await sendRequest({
    url: "/api/settings/password",
    method: RequestMethod.PUT,
    body: changePasswordData,
  });

export const changeName = async (changeNameData: ChangeNameData) =>
  await sendRequest({
    url: "/api/settings/name",
    method: RequestMethod.PUT,
    body: changeNameData,
  });

export const changeLogin = async (changeNameData: ChangeLoginData) =>
  await sendRequest({
    url: "/api/settings/login",
    method: RequestMethod.PUT,
    body: changeNameData,
  });

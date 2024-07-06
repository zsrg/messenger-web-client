import { CreateSessionData } from "../types/user";
import { RequestMethod, sendRequest } from ".";

export const createSession = async (createSessionData: CreateSessionData) =>
  await sendRequest({
    url: "/api/session",
    method: RequestMethod.POST,
    body: createSessionData,
  });

export const deleteSession = async () =>
  await sendRequest({
    url: "/api/session",
    method: RequestMethod.DELETE,
    keepalive: true,
  });

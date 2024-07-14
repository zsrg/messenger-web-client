import { RequestMethod, sendRequest } from ".";
import { SendMessageData } from "../types/messages";

export const sendMessage = async (sendMessageData: SendMessageData) =>
  await sendRequest({
    url: "/api/messages/message",
    method: RequestMethod.POST,
    body: sendMessageData,
  });

export const getMessages = async (
  dialogId: number,
  limit: number = 1000,
  offset: number = 0
) =>
  await sendRequest({
    url: `/api/messages/dialog/${dialogId}`,
    query: { limit, offset },
  });

export const deleteDialogMessages = async (dialogId: number) =>
  await sendRequest({
    url: `/api/messages/dialog/${dialogId}`,
    method: RequestMethod.DELETE,
  });

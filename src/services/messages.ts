import { RequestMethod, sendRequest } from ".";

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

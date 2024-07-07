import { sendRequest } from ".";

export const getMessages = async (
  dialogId: number,
  limit: number = 1000,
  offset: number = 0
) =>
  await sendRequest({
    url: `/api/messages/dialog/${dialogId}`,
    query: { limit, offset },
  });

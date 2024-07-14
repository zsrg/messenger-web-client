import { RequestMethod, sendRequest } from ".";

export const deleteDialogAttachments = async (dialogId: number) =>
  await sendRequest({
    url: `/api/attachments/dialog/${dialogId}`,
    method: RequestMethod.DELETE,
  });

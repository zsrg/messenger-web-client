import { RequestMethod, ResponseFormat, sendRequest } from ".";

export const getAttachment = async (attachmentId: number) =>
  await sendRequest({
    url: `/api/attachments/${attachmentId}`,
    format: ResponseFormat.BLOB,
  });

export const deleteDialogAttachments = async (dialogId: number) =>
  await sendRequest({
    url: `/api/attachments/dialog/${dialogId}`,
    method: RequestMethod.DELETE,
  });

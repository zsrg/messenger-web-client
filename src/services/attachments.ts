import { CreateAttachmentData } from "../types/attachments";
import { RequestMethod, ResponseFormat, sendRequest } from ".";

export const createAttachment = async (createAttachmentData: CreateAttachmentData) =>
  await sendRequest({
    url: "/api/attachments/attachment",
    method: RequestMethod.POST,
    body: createAttachmentData,
  });

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

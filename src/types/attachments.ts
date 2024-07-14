export interface GetAttachmentData {
  attachmentId: number;
  data: string;
}

export interface CreateAttachmentData {
  dialogId: number;
  base64: string;
}

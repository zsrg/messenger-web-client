export interface SendMessageData {
  dialogId: number;
  text: string;
  attachmentId?: number;
}

export interface MessageData {
  id: number;
  dialogId: number;
  userId: number;
  date: string;
  text: string;
  attachmentId: number;
}

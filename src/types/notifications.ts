export enum NotificationType {
  Success = "success",
  Error = "error",
  Info = "info",
}

export interface CreateNotificationData {
  text: string;
  type?: NotificationType;
  showTime?: number;
}

export interface NotificationData extends CreateNotificationData {
  id: string;
}

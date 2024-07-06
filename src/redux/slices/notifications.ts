import { CreateNotificationData, NotificationData } from "../../types/notifications";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getId } from "../../helpers/id";

export interface NotificationsState {
  notifications: NotificationData[];
}

const initialState: NotificationsState = {
  notifications: [],
};

export const notificatiosSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state: NotificationsState, action: PayloadAction<CreateNotificationData>) => {
      state.notifications.push({ ...action.payload, id: getId() });
    },
    deleteNotification: (state: NotificationsState, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex(((notification: NotificationData) => notification.id === action.payload));
      if (index !== -1) {
        state.notifications.splice(index, 1);
      }
    },
  },
});

export const { addNotification, deleteNotification } = notificatiosSlice.actions;

export default notificatiosSlice.reducer;

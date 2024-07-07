import { sendRequest } from ".";

export const getDialogs = async () =>
  await sendRequest({
    url: "/api/dialogs",
  });

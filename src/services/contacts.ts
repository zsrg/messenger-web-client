import { sendRequest } from ".";

export const getContacts = async () =>
  await sendRequest({
    url: "/api/users",
  });

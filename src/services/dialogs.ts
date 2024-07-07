import { CreateDialogData } from "../types/dialogs";
import { RequestMethod, sendRequest } from ".";

export const creteDialog = async (createDialogData: CreateDialogData) =>
  await sendRequest({
    url: "/api/dialogs/dialog",
    method: RequestMethod.POST,
    body: createDialogData,
  });

export const getDialogs = async () =>
  await sendRequest({
    url: "/api/dialogs",
  });

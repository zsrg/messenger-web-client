export interface CustomPayloadAction<T = any> {
  payload: T | any;
  meta: {
    requestStatus: "fulfilled" | "rejected";
  };
}

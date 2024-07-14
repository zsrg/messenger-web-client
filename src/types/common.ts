export interface CustomPayloadAction<T> {
  payload: T | any;
  meta: {
    requestStatus: "fulfilled" | "rejected";
  };
}

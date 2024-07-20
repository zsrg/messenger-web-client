import { createEventSource } from ".";

export const subscribe = () =>
  createEventSource({
    url: "/api/subscribe",
  });

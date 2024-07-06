export interface CreateSessionData {
  login: string;
  password: string;
}

export interface SessionData {
  id: string;
  userId: number;
  creationDate: string;
  lastActivityDate: string;
}

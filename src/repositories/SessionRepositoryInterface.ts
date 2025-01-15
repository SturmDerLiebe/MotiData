export interface SessionRepositoryInterface {
  readSessionId(): Promise<string>;

  saveSessionId(sessionId: string): Promise<void>;

  /** Retrieves and Checks if {@link sessionId} is not empty */
  hasValidSessionId(): Promise<boolean>;
}

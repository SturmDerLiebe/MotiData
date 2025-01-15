export interface SessionRepositoryInterface {
    readSessionId(): string | Promise<string>;

    saveSessionId(sessionId: string): void | Promise<void>;

    /** Retrieves and Checks if {@link sessionId} is not empty */
    hasValidSessionId(): boolean | Promise<boolean>;
}

export const MockSessionRepository = {
    _sessionId: "",

    readSessionId() {
        return this._sessionId;
    },

    saveSessionId(sessionId: string) {
        this._sessionId = sessionId;
    },

    hasValidSessionId() {
        return true;
    },
};

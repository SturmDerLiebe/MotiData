import { test, expect } from "vitest";
import { BaseRepository } from "../BaseRepository.js";
import { UserRepository } from "../UserRepository.js";
import { CustomHeadersNames } from "../../constants/CustomHeaders.js";

const EXPECTED_TEST_KEY = "TEST12345";
const EXPECTED_SESSION_ID = "ID1111";
const MockSessionRepository = {
    readSessionId() {
        return EXPECTED_SESSION_ID;
    },
    saveSessionId(_sessionId: string) {},
    hasValidSessionId() {
        return true;
    },
};

test("Should append SessionId and ApiKey as Headers", async () => {
    //GIVEN
    const MOCK_REPO = new UserRepository({
        apiBaseUrl: BaseRepository.Api.mockaroo,
        publicApiKey: EXPECTED_TEST_KEY,
        sessionRepository: MockSessionRepository,
    });
    //WHEN
    const ACTUAL = (
        await MOCK_REPO._bulildRequest({ method: "GET", route: "" })
    ).headers;
    //THEN
    expect(ACTUAL.get(CustomHeadersNames.sessionId)).toBe(EXPECTED_SESSION_ID);
    expect(ACTUAL.get(CustomHeadersNames.apiKey)).toBe(EXPECTED_TEST_KEY);
});

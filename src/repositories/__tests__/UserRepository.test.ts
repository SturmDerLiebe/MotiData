import { test, expect, vi } from "vitest";
import { BaseRepository } from "../BaseRepository.js";
import { UserRepository } from "../UserRepository.js";
import { CustomHeadersNames } from "../../constants/CustomHeaders.js";
import { MockSessionRepository } from "./mocks/SessionRepositoryMock.js";
import { afterEach } from "node:test";

const EXPECTED_TEST_KEY = "TEST12345";

const MOCK_REPO = new UserRepository({
    apiBaseUrl: BaseRepository.Api.mockaroo,
    publicApiKey: EXPECTED_TEST_KEY,
    sessionRepository: MockSessionRepository,
});

afterEach(() => {
    MockSessionRepository.saveSessionId("");
});

test("should append SessionId and ApiKey as Headers", async () => {
    //GIVEN
    const EXPECTED_SESSION_ID = "ID1111";
    MockSessionRepository.saveSessionId(EXPECTED_SESSION_ID);

    //WHEN
    const ACTUAL = (
        await MOCK_REPO._bulildRequest({ method: "GET", route: "" })
    ).headers;

    //THEN
    expect(ACTUAL.get(CustomHeadersNames.sessionId)).toBe(EXPECTED_SESSION_ID);
    expect(ACTUAL.get(CustomHeadersNames.apiKey)).toBe(EXPECTED_TEST_KEY);
});

test("should save session id from header to session repo", async () => {
    //GIVEN
    const EXPECTED_SESSION_ID = "NEW2222";
    const GIVEN_HEADERS = new Headers();
    GIVEN_HEADERS.append(CustomHeadersNames.sessionId, EXPECTED_SESSION_ID);
    const GIVEN_RESPONSE = new Response(null, { headers: GIVEN_HEADERS });

    //WHEN
    await MOCK_REPO._handleResponseAfterAuthentication(GIVEN_RESPONSE);

    //THEN
    expect(MockSessionRepository.readSessionId()).toBe(EXPECTED_SESSION_ID);
});

test("should handle session id holding response", async () => {
    //GIVEN
    const SPY = vi.spyOn(MOCK_REPO, "_handleResponseAfterAuthentication");

    //WHEN
    await MOCK_REPO.registerUser({ username: "", email: "", password: "" });

    //THEN
    expect(SPY).toHaveBeenCalledOnce();
});

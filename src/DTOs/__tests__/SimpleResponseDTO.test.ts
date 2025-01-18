import { expect, test } from "vitest";
import {
    SimpleResponseHelpers,
    type SimpleResponseDTO,
} from "../SimpleResponseDTO.js";

test("should transform to SimpleResponseDTO", async () => {
    //GIVEN
    const EXPECTED_STATUS = 200;
    const EXPECTED_DATA = { aKey: "aValue" };
    const RESPONSE = new Response(JSON.stringify(EXPECTED_DATA), {
        status: EXPECTED_STATUS,
        headers: new Headers({ "Content-Type": "application/json" }),
    });

    //WHEN
    const ACTUAL =
        await SimpleResponseHelpers.transformToSimpleResponse<
            typeof EXPECTED_DATA
        >(RESPONSE);

    //THEN
    expect(ACTUAL).toEqual<SimpleResponseDTO<typeof EXPECTED_DATA>>({
        ok: RESPONSE.ok,
        statusCode: RESPONSE.status,
        data: EXPECTED_DATA,
    });
});

test("should handle default, non json response", async () => {
    //GIVEN
    const EXPECTED_DATA = "12345";
    const RESPONSE = new Response(EXPECTED_DATA);
    //WHEN
    const ACTUAL =
        await SimpleResponseHelpers._extractDataBasedOnContentType(RESPONSE);

    //THEN
    expect(ACTUAL).toEqual(EXPECTED_DATA);
});

test("should handle Content-Type=application/json response", async () => {
    //GIVEN
    const EXPECTED_DATA = { testKey: "testValue" };
    const RESPONSE = new Response(JSON.stringify(EXPECTED_DATA), {
        headers: new Headers({
            "Content-Type": "application/json; charset=utf-8",
        }),
    });

    //WHEN
    const ACTUAL =
        await SimpleResponseHelpers._extractDataBasedOnContentType(RESPONSE);

    //THEN
    expect(ACTUAL).toEqual(EXPECTED_DATA);
});

import { expect, test } from "vitest";
import {
    _extractDataBasedOnContentType,
    transformToSimpleResponse,
    type SimpleResponse,
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
        await transformToSimpleResponse<typeof EXPECTED_DATA>(RESPONSE);

    //THEN
    expect(ACTUAL).toEqual<SimpleResponse<typeof EXPECTED_DATA>>({
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
    const ACTUAL = await _extractDataBasedOnContentType(RESPONSE);

    //THEN
    expect(ACTUAL).toEqual(EXPECTED_DATA);
});
    //WHEN
    const ACTUAL = await extractDataBasedOnContentType(RESPONSE);

    //THEN
    expect(ACTUAL).toEqual(EXPECTED_DATA);
});

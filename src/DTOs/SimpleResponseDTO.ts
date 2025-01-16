import type { Serializable } from "child_process";

export interface SimpleResponse<
    BodyType extends Serializable | undefined = undefined,
> {
    ok: boolean;
    statusCode: number;
    data?: BodyType;
}

/**
 * Due to limitations of NextJs Server Actions, [this can not be  a class](https://react.dev/reference/rsc/use-server#serializable-parameters-and-return-values).
 * @throws any `Response.json()` related error
 */
export async function transformToSimpleResponse<
    ResponseDTO extends Serializable | undefined = undefined,
>(fetchResponse: Response): Promise<SimpleResponse<ResponseDTO>> {
    return {
        ok: fetchResponse.ok,
        statusCode: fetchResponse.status,
        data:
            fetchResponse.headers.get("Content-Type") === "application/json"
                ? ((await fetchResponse.json()) as ResponseDTO)
                : undefined,
    };
}

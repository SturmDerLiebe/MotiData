import type { Serializable } from "child_process";

export interface SimpleResponseDTO<
    BodyType extends Serializable | undefined = undefined,
> {
    ok: boolean;
    statusCode: number;
    data?: BodyType;
}

/**
 * Collection of {@link SimpleResponseDTO} Helpers
 */
export const SimpleResponseHelpers = {
    /**
     * Due to limitations of NextJs Server Actions, [this can not be  a class](https://react.dev/reference/rsc/use-server#serializable-parameters-and-return-values).
     * @throws any `Response.json()` related error
     */
    async transformToSimpleResponse<
        ResponseDTO extends Serializable | undefined = undefined,
    >(fetchResponse: Response): Promise<SimpleResponseDTO<ResponseDTO>> {
        return {
            ok: fetchResponse.ok,
            statusCode: fetchResponse.status,
            data: (await this._extractDataBasedOnContentType(
                fetchResponse,
            )) as ResponseDTO,
        };
    },

    /**
     * @private
     */
    async _extractDataBasedOnContentType(
        fetchResponse: Response,
    ): Promise<unknown> {
        const CONTENT_TYPE = fetchResponse.headers.get("Content-Type");
        if (CONTENT_TYPE === null) {
            return undefined;
        } else if (CONTENT_TYPE.includes("application/json")) {
            return await fetchResponse.json();
        } else if (CONTENT_TYPE.includes("text/plain")) {
            return await fetchResponse.text();
        }
    },
};

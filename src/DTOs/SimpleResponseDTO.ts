import type { Serializable } from "child_process";

export interface SimpleResponse<
    BodyType extends Serializable | undefined = undefined,
> {
    ok: boolean;
    statusCode: number;
    data?: BodyType;
}

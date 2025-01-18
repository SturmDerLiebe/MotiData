import { ContentType, MimeTypes } from "../constants/ContentTypeHeader.js";
import type { BaseGroupMessageDTO } from "../DTOs/GroupMessageDTO.js";
import {
    SimpleResponseHelpers,
    type SimpleResponseDTO,
} from "../DTOs/SimpleResponseDTO.js";
import {
    BaseRepository,
    type BaseRepositoryConstructorParam,
} from "./BaseRepository.js";

export class GroupRepository extends BaseRepository {
    constructor(baseArgs: BaseRepositoryConstructorParam) {
        super(
            baseArgs.apiBaseUrl,
            baseArgs.publicApiKey,
            baseArgs.sessionRepository,
        );
    }

    /**
     * @throws any `fetch()` related error
     * @throws any `Response.json()` related error
     * @throws any {@link sessionRepository} related Error
     */
    async create(groupName: string): Promise<SimpleResponseDTO> {
        const RESPONSE = await fetch(
            await this._bulildRequest({
                route: "group",
                method: "POST",
                queryParams: new URLSearchParams({ name: groupName }),
                body: groupName,
                extraHeaders: new Headers({
                    [ContentType]: MimeTypes.textPlain,
                }),
            }),
        );

        return await SimpleResponseHelpers.transformToSimpleResponse(RESPONSE);
    }

    /**
     * @throws any `fetch()` related error
     * @throws any `Response.json()` related error
     * @throws any {@link sessionRepository} related Error
     */
    async join(joinCode: string): Promise<SimpleResponseDTO> {
        const RESPONSE = await fetch(
            await this._bulildRequest({
                route: "group/join",
                method: "POST",
                queryParams: new URLSearchParams({ code: joinCode }),
                body: joinCode,
                extraHeaders: new Headers({
                    [ContentType]: MimeTypes.textPlain,
                }),
            }),
        );

        return await SimpleResponseHelpers.transformToSimpleResponse(RESPONSE);
    }

    /**
     * @throws any `fetch()` related error
     * @throws any `Response.json()` related error
     * @throws any {@link sessionRepository} related Error
     */
    async sendMessage(
        newMessageDTO: BaseGroupMessageDTO,
    ): Promise<SimpleResponseDTO> {
        //TODO: if process.env.NODE_ENV === "development"
        const RESPONSE = await fetch(
            await this._buildJsonRequest(newMessageDTO, {
                route: "group/message",
                method: "POST",
                queryParams: new URLSearchParams({
                    message: newMessageDTO.content,
                }),
            }),
        );

        return await SimpleResponseHelpers.transformToSimpleResponse(RESPONSE);
    }

    /**
     * @throws any `fetch()` related error
     * @throws any `Response.json()` related error
     * @throws any {@link sessionRepository} related Error
     */
    async receiveExistingMessages(): Promise<SimpleResponseDTO> {
        const RESPONSE = await fetch(
            await this._bulildRequest({
                route: "group/message",
                method: "GET",
                queryParams: new URLSearchParams({ amount: "20" }),
            }),
        );

        return await SimpleResponseHelpers.transformToSimpleResponse(RESPONSE);
    }

    /**
     * @throws any `fetch()` related error
     * @throws any `Response.json()` related error
     * @throws any {@link sessionRepository} related Error
     */
    async receiveNewMessages(): Promise<SimpleResponseDTO> {
        const RESPONSE = await fetch(
            await this._bulildRequest({
                route: "group/message",
                method: "GET",
                queryParams: new URLSearchParams({ amount: "2" }),
            }),
        );

        return await SimpleResponseHelpers.transformToSimpleResponse(RESPONSE);
    }

    /**
     * @throws any `fetch()` related error
     * @throws any `Response.json()` related error
     * @throws any {@link sessionRepository} related Error
     */
    async leaveCurrentGroup(): Promise<SimpleResponseDTO> {
        const RESPONSE = await fetch(
            await this._bulildRequest({
                route: "group/leave",
                method: "POST",
            }),
        );

        return await SimpleResponseHelpers.transformToSimpleResponse(RESPONSE);
    }
}

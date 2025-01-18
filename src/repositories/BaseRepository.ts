import { ContentType, MimeTypes } from "../constants/ContentTypeHeader.js";
import { CustomHeadersNames } from "../constants/CustomHeaders.js";
import type { SessionRepositoryInterface } from "./SessionRepositoryInterface.js";

type ApiBaseUrlType =
    (typeof BaseRepository.Api)[keyof typeof BaseRepository.Api];

export interface BaseRepositoryConstructorParam {
    apiBaseUrl: ApiBaseUrlType;
    publicApiKey: string;
    sessionRepository: SessionRepositoryInterface;
}

interface RequestParams {
    route: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    queryParams?: URLSearchParams;
    extraHeaders?: Headers;
    body?: RequestInit["body"];
    signal?: AbortSignal | null;
}

export abstract class BaseRepository {
    static Api = { mockaroo: "https://my.api.mockaroo.com" };

    static Routes = {
        registration: "registration",
        activation: "activation",
        personalGoal: "personal-goal",
        group: "group",
        message: "group/message",
        userInfo: "user-info",
    };

    constructor(
        private apiBaseUrl: ApiBaseUrlType,
        private publicApiKey: string,
        public sessionRepository: SessionRepositoryInterface,
    ) {}

    /**
     * @throws any {@link sessionRepository} related Error
     */
    private async buildBaseHeaders() {
        const HEADERS = new Headers({
            [CustomHeadersNames.sessionId]:
                await this.sessionRepository.readSessionId(),
            [CustomHeadersNames.apiKey]: this.publicApiKey,
            [ContentType]: MimeTypes.applicationJson,
        });

        return HEADERS;
    }

    /**
     * Sets the Content-Type to application/json by default. Can be overridden by settin {@link extraHeaders}.
     * @protected
     * @throws any {@link sessionRepository} related Error
     */
    async _bulildRequest({
        route,
        method,
        queryParams = new URLSearchParams(),
        extraHeaders = new Headers(),
        body,
        signal,
    }: RequestParams): Promise<Request> {
        const headers = await this.buildBaseHeaders();
        extraHeaders.forEach((headerValue, headerName) => {
            headers.append(headerName, headerValue);
        });

        return new Request(
            `${this.apiBaseUrl}/${route}?${queryParams.toString()}`,
            {
                method,
                headers,
                body,
                signal: signal,
            },
        );
    }

    /**
     * @protected
     * @throws any {@link sessionRepository} related Error
     */
    async _handleResponseAfterAuthentication(
        response: Response,
    ): Promise<void> {
        await this.sessionRepository.saveSessionId(
            response.headers.get(CustomHeadersNames.sessionId) ?? "",
        );
    }
}

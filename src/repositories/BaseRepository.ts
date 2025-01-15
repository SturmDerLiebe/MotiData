import { CustomHeadersNames } from "../constants/CustomHeaders.js";
import type { SessionRepositoryInterface } from "./SessionRepositoryInterface.js";

type ApiBaseUrlType =
    (typeof BaseRepository.Api)[keyof typeof BaseRepository.Api];

export interface BaseRepositoryConstructorArgs {
    apiBaseUrl: ApiBaseUrlType;
    publicApiKey: string;
    sessionRepository: SessionRepositoryInterface;
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

    private async buildBaseHeaders() {
        const HEADERS = new Headers();
        HEADERS.append(
            CustomHeadersNames.sessionId,
            await this.sessionRepository.readSessionId(),
        );

        HEADERS.append("X-API-Key", this.publicApiKey);

        return HEADERS;
    }

    /**
     * @protected
     */
    async _bulildRequest({
        route,
        method,
        queryParams = new URLSearchParams(),
        extraHeaders = new Headers(),
        body,
        signal,
    }: {
        route: (typeof BaseRepository.Routes)[keyof typeof BaseRepository.Routes];
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        queryParams?: URLSearchParams;
        extraHeaders?: Headers;
        body?: RequestInit["body"];
        signal?: AbortSignal | null;
    }) {
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

    protected async handleResponseAfterAuthentication(
        response: Response,
    ): Promise<void> {
        await this.sessionRepository.saveSessionId(
            response.headers.get(CustomHeadersNames.sessionId) ?? "",
        );
    }
}

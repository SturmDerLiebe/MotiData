import type { RegistrationDTO } from "../DTOs/RegistrationDTO.js";
import {
    SimpleResponseHelpers,
    type SimpleResponse,
} from "../DTOs/SimpleResponseDTO.js";
import type { UserDetailsDTO } from "../DTOs/UserDetailsDTO.js";
import {
    BaseRepository,
    type BaseRepositoryConstructorArgs,
} from "./BaseRepository.js";

export class UserRepository extends BaseRepository {
    constructor(baseArgs: BaseRepositoryConstructorArgs) {
        super(
            baseArgs.apiBaseUrl,
            baseArgs.publicApiKey,
            baseArgs.sessionRepository,
        );
    }

    /**
     * Sends a request to register the new user with {@link RegistrationDTO} and handles saving the sessionID from the Responses Header
     * @throws any `fetch()` related error
     * @throws any `Response.json()` related error
     * @throws any {@link sessionRepository} related Error
     */
    async registerUser(body: RegistrationDTO): Promise<SimpleResponse> {
        const RESPONSE = await fetch(
            await this._bulildRequest({
                route: BaseRepository.Routes.registration,
                method: "POST",
                queryParams: new URLSearchParams({ username: body.username }),
                body: JSON.stringify(body),
            }),
        );

        await this._handleResponseAfterAuthentication(RESPONSE);

        return SimpleResponseHelpers.transformToSimpleResponse(RESPONSE);
    }

    /**
     * @throws any `fetch()` related error
     * @throws any `Response.json()` related error
     * @throws any {@link sessionRepository} related Error
     */
    async verifyUser(verificationCode: string): Promise<SimpleResponse> {
        const RESPONSE = await fetch(
            await this._bulildRequest({
                route: BaseRepository.Routes.activation,
                method: "POST",
                queryParams: new URLSearchParams({ code: verificationCode }),
                body: JSON.stringify(verificationCode),
            }),
        );

        return SimpleResponseHelpers.transformToSimpleResponse(RESPONSE);
    }

    /**
     * @throws any `fetch()` related error
     * @throws any `Response.json()` related error
     * @throws any {@link sessionRepository} related Error
     */
    async updatePersonalGoal(goalPerWeek: number): Promise<SimpleResponse> {
        const RESPONSE = await fetch(
            await this._bulildRequest({
                route: BaseRepository.Routes.personalGoal,
                method: "PUT",
                queryParams: new URLSearchParams({
                    goal: goalPerWeek.toString(),
                }),
                body: JSON.stringify(goalPerWeek),
            }),
        );

        return SimpleResponseHelpers.transformToSimpleResponse(RESPONSE);
    }

    /**
     * @throws any `fetch()` related error
     * @throws any `Response.json()` related error
     * @throws any {@link sessionRepository} related Error
     */
    async getUserInfo(
        abortSignal: AbortSignal,
    ): Promise<SimpleResponse<UserDetailsDTO>> {
        const RESPONSE = await fetch(
            await this._bulildRequest({
                route: BaseRepository.Routes.userInfo,
                method: "GET",
                signal: abortSignal,
            }),
        );

        return SimpleResponseHelpers.transformToSimpleResponse(RESPONSE);
    }
}

/**
 * A Data Transfer Object containing details about a new user to be registered
 */
export class RegistrationDTO {
    static formFieldNames = {
        username: "username",
        email: "email",
        password: "password",
    };

    static buildFromObject({
        username = "",
        email = "",
        password = "",
    }: Record<string, string>) {
        return new RegistrationDTO(username, email, password);
    }

    constructor(
        public username: string,
        public email: string,
        public password: string,
    ) {}
}

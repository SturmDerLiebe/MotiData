export interface RegistrationDTO {
    username: string;
    email: string;
    password: string;
}

export const RegistrationHelper = {
    buildFromObject({
        username = "",
        email = "",
        password = "",
    }: RegistrationDTO) {
        return { username, email, password };
    },
};

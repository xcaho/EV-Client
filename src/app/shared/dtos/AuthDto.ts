export class AuthDto {

    public token: string;
    public password: string;
    public userId: string;

    constructor(token: string, password: string, userId: string) {
        this.token = token;
        this.password = password;
        this.userId = userId;
    }
}

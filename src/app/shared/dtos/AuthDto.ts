export class AuthDto {

  public token: string;
  public password: string;
  public userId: string;
  public userName: string;
  public role: string;

  constructor(token: string,
              password: string,
              userId: string,
              userName: string,
              role: string) {
    this.token = token;
    this.password = password;
    this.userId = userId;
    this.userName = userName;
    this.role = role;
  }
}

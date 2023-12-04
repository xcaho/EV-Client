export class AuthDto {

  public token: string;
  public password: string;
  public userId: string;
  public name: string;
  public role: string;

  constructor(token: string,
              password: string,
              userId: string,
              name: string,
              role: string) {
    this.token = token;
    this.password = password;
    this.userId = userId;
    this.name = name;
    this.role = role;
  }
}

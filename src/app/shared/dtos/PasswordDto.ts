export class PasswordDto {
  public password: string = '';
  public oldPassword: string = '';


  constructor(password: string, oldPassword: string) {
    this.password = password;
    this.oldPassword = oldPassword;
  }
}

import { Role } from "../enums/role";

export class User {

  public email: string;
  public name: string;
  public role: Role;
  public isBlocked: boolean = false;

  constructor(email: string, name: string, role: Role, isBlocked: boolean = false) {
    this.email = email;
    this.name = name;
    this.role = role;
    this.isBlocked = isBlocked;
  }
}

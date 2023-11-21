import { Role } from "../enums/role";

export class User {

  public id: number = 0;
  public email: string;
  public name: string;
  public role: Role;
  public blocked: boolean = false;

  constructor(email: string, name: string, role: Role, isBlocked: boolean = false, id: number = 0) {
    this.email = email;
    this.name = name;
    this.role = role;
    this.blocked = isBlocked;
    this.id = id;
  }

  public isBlocked() {
    return this.blocked ? "Zablokowany" : "Aktywny"
  }
}

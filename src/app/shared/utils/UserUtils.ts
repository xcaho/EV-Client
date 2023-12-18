import {Role} from "../enums/role";

export class UserUtils {

  static getRoleFromString(role: String) : Role {

    switch (role) {
      case "rekruter":
        return Role.RECRUITER;
      case "administrator":
        return Role.ADMIN;
      case "readonly":
        return Role.READONLY;
      default:
        return Role.READONLY;
    }
  }
}

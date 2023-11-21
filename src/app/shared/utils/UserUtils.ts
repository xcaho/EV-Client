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
        console.log("Invalid role, choosing default")
        return Role.READONLY;
    }
  }
}

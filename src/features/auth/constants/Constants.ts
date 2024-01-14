export class AuthEndpoint {
  static LOGIN = "/api/users/login";
  static LOGOUT = "/api/users/logout";
  static REFRESH_TOKEN = "/api/token/refresh";
  static REGISTER = "/api/users/register";
}

export class ActionReducer {
  static SET_CURRENT_USER = "SET_CURRENT_USER";
  static RESET_CURRENT_USER = "RESET_CURRENT_USER";
}

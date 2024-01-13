

export class AuthEndpoint {
      static LOGIN = "/api/login";
      static LOGOUT = "/api/logout";
      static REFRESH_TOKEN = "/api/token/refresh";
}

export class ActionReducer {
      static SET_CURRENT_USER = 'SET_CURRENT_USER'
      static RESET_CURRENT_USER = 'RESET_CURRENT_USER'
}
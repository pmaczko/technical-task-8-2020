export class AuthInit {
    static readonly type = '[Auth] Init';
}

export class AuthLogin {
    static readonly type = '[Auth] Login';
}

export class AuthLogout {
    static readonly type = '[Auth] Logout';
}

export class AuthSetUser {
    static readonly type = '[Auth] Set User';

    constructor(public readonly payload: gapi.auth2.GoogleUser | null) {
    }
}

export class AuthSetError {
    static readonly type = '[Auth] Set Error';

    constructor(public readonly payload: string) {
    }
}

export type AuthActions =
    | AuthInit
    | AuthLogin
    | AuthLogout
    | AuthSetUser
    | AuthSetError
    ;

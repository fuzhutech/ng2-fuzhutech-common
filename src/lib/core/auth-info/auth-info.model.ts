export class AuthInfo {
    id: number;
    user?: AuthUser;
    token?: string;
    resources?: any;
}

export class AuthUser {
    id;
    loginName;
    nickName;
    realName;
    email;
    lastLoginTime;
}

export class MenuInfo {
    id?: number;
    menus?: any;
}

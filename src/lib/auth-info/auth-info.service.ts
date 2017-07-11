import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Http, Headers, Response} from '@angular/http';
import {HOST_API_PATH} from '../index';
import {Md5} from 'ts-md5/dist/md5';
import {AuthInfo, AuthUser, MenuInfo} from './auth-info.model';

@Injectable()
export class AuthInfoService {

    private host_api = HOST_API_PATH;
    private _authInfo: AuthInfo;
    private _authInfoSubject: Subject<AuthInfo> = new Subject<AuthInfo>();
    private _authUser: AuthUser;
    private _authUserSubject: Subject<AuthUser> = new Subject<AuthUser>();
    private _menuInfo: MenuInfo;
    private _menuInfoSubject: Subject<MenuInfo> = new Subject<MenuInfo>();

    constructor(private http: Http) {
        console.log('AuthInfoService constructor');
    }

    /**
     * 设置当前AuthInfo，同时更新Subject
     * @param authInfo
     */
    public set currentAuthInfo(authInfo: AuthInfo) {
        console.log('set currentAuthInfo');
        this._authInfo = authInfo;

        if (authInfo) {
            this._authInfoSubject.next(this._authInfo);
        } else {
            this._authInfoSubject.next(Object.assign({}));
            //this.authInfoSubject.next();
        }

        this.currentAuthUser = authInfo.user || null;
    }

    /**
     * 获取当前AuthInfo
     * @returns {AuthInfo}
     */
    public get currentAuthInfo(): AuthInfo {
        return this._authInfo;
    }

    /**
     * 获取Authinfo,Observable对象发生变化而变化
     * @returns {Observable<AuthInfo>}
     */
    public get authInfoSubject(): Observable<AuthInfo> {
        return this._authInfoSubject.asObservable();
    }

    /**
     * 设置当前AuthUser，同时更新Subject.
     * @param authUser
     */
    public set currentAuthUser(authUser: AuthUser) {
        this._authUser = authUser;
        if (authUser) {
            this._authUserSubject.next(this._authUser);
        } else {
            this._authUserSubject.next();
        }
    }

    public get currentAuthUser(): AuthUser {
        return this._authUser;
    }

    public get authUserSubject(): Observable<AuthInfo> {
        return this._authUserSubject.asObservable();
    }

    public refreshAuthInfo(userId: number) {
        //this.subject.next(Object.assign({}, {id: 1}));

        return this.http
            .get(this.host_api + '/users/' + userId + '/resources')
            .map((response: Response) => {
                const res = response.json();
                if (res.status == 1) {
                    if (this.currentAuthInfo) {
                        console.log('存在currentAuthInfo');
                        this.currentAuthInfo.resources = res.data.list;
                    } else {
                        console.log('不存在currentAuthInfo');
                        const authInfo = new AuthInfo();
                        authInfo.resources = res.data.list;
                        this.currentAuthInfo = authInfo;
                    }
                }

                console.log(this.currentAuthInfo);

                return response;
            })
            .subscribe(
                data => {
                    console.log('login success>' + data);
                },
                error => {
                    console.error(error);
                }
            );
    }

    public clearAuthInfo(): void {
        //localStorage.removeItem('currentAuthInfo');
        this.currentAuthInfo = null;
    }

    public set currentMenuInfo(menuInfo: MenuInfo) {
        this._menuInfo = menuInfo;

        if (menuInfo) {
            this._menuInfoSubject.next(this._menuInfo);
        } else {
            this._menuInfoSubject.next();
        }
    }

    public get currentMenuInfo(): MenuInfo {
        return this._menuInfo;
    }

    public get menuInfoSubject(): Observable<MenuInfo> {
        return this._menuInfoSubject.asObservable();
    }

    public refreshMenuInfo(sysId: number) {

        console.log('refreshMenuInfo');

        return this.http
            .get(this.host_api + '/systems/' + sysId + '/resources')
            .map((response: Response) => {
                const res = response.json();

                if (res.status == 1) {
                    if (this.currentMenuInfo) {
                        this.currentMenuInfo.menus = res.data.list;
                    } else {
                        const menuInfo = new MenuInfo();
                        menuInfo.menus = res.data.list;
                        this.currentMenuInfo = menuInfo;
                    }
                }

                return response;
            })
            .subscribe(
                data => {
                    console.log('login success>' + data);
                },
                error => {
                    console.error(error);
                }
            );
    }

}

import {AuthInfoService} from '../auth-info/auth-info.service';
import {MdDialog} from '@angular/material';
import {ErrorService} from '../error/error.service';

//全局变量工具类，单例模式
export class ServiceUtil {
    private static instance: ServiceUtil = new ServiceUtil();

    private static authInfoService: AuthInfoService = null;

    private static errorService: ErrorService = null;

    /**
     * 获取当前实例
     * @returns {ServiceUtil}
     */
    public static getInstance(): ServiceUtil {
        return ServiceUtil.instance;
    }

    /**
     * 获取AuthInfoService
     * @returns {AuthInfoService}
     */
    public static getAuthInfoService(): AuthInfoService {
        return ServiceUtil.authInfoService;
    }

    /**
     * 设置AuthInfoService
     * @param authInfoService
     */
    public static setAuthInfoService(authInfoService: AuthInfoService) {
        ServiceUtil.authInfoService = authInfoService;
    }

    public static getErrorService(): ErrorService {
        return ServiceUtil.errorService;
    }

    public static setErrorService(errorService: ErrorService) {
        ServiceUtil.errorService = errorService;
    }

    constructor() {
        if (ServiceUtil.instance) {
            throw new Error('错误: 请使用AppGlobal.getInstance() 代替使用new.');
        }
        ServiceUtil.instance = this;
    }

}

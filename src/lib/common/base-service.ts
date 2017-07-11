import {Headers, Http, URLSearchParams} from '@angular/http';
import {HOST_API_PATH, HOST_PATH} from './constant';
import {ResponseResult} from '../model';
import 'rxjs/add/operator/toPromise';

export abstract class BaseService {

    protected http: Http;
    protected url: string;
    private host = HOST_PATH;
    private host_api = HOST_API_PATH;

    constructor(http: Http, path: string) {
        this.http = http;
        this.url = this.host_api + '/' + path;

        this.getConfigInfo().then(data => console.log(data));
    }

    getConfigInfo() {
        return this.http.get('assets/data/files.json')
            .toPromise()
            .then(res => res.json().data);
    }

    getList() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        const searchParams = new URLSearchParams();
        //searchParams.set('offset', '1');
        //searchParams.set('rows', '20');
        //searchParams.set('sort', 'id');
        //searchParams.set('order', 'asc');

        return this.http.get(this.url, {search: searchParams, headers: headers})
            .map(response => response.json());
    }

    getListByPageInfo(offset, rows, total) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        const searchParams = new URLSearchParams();
        searchParams.set('offset', offset);
        searchParams.set('rows', rows);
        searchParams.set('total', total);

        return this.http.get(this.url + '/page', {search: searchParams, headers: headers})
            .map(response => response.json());
    }

    create(data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.url, JSON.stringify(data), {headers: headers})
            .map(res => <ResponseResult> res.json());
    }

    edit(data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(this.url, JSON.stringify(data), {headers: headers})
            .map(res => <ResponseResult> res.json());
    }

    delete(data) {
        if (!data) {
            data = {id: '-1'};
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //const url = 'http://localhost/api/computers';

        return this.http.delete(this.url + '/' + data.id, {headers: headers})
            .map(res => <ResponseResult> res.json());
    }

    /**
     * 处理请求成功
     * @param res
     * @returns {{data:(string|null|((node:any)=>any)}}
     */
    private handleSuccess(res: Response) {
        const body = res['_body'];
        if (body) {
            return {
                data: res.json() || {},
                page: res.json() || {},
                statusText: res.statusText,
                status: res.status,
                success: true
            };
        } else {
            return {
                statusText: res.statusText,
                status: res.status,
                success: false
            };
        }
    }

    /**
     * 处理请求错误
     * @param error
     * @returns {void|Promise<string>|Promise<T>|any}
     */
    private handleError(error) {
        console.log(error);
        const msg = '请求失败';
        if (error.status == 400) {
            console.log('请求参数正确');
        } else if (error.status == 404) {
            console.log('请检查路径是否正确');
        } else if (error.status == 500) {
            console.log('请求的服务器错误');
        }

        return {success: false, msg: msg};
    }

}

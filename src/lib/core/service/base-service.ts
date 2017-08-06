import {Headers, Http, URLSearchParams} from '@angular/http';
import {HOST_API_PATH, HOST_PATH} from '../../utils/constant';
import {ResponseResult} from '../index';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface Todo {
    id?: string;
    desc: string;
    completed: boolean;
    userId?: number;
}

export abstract class BaseService {

    protected http: Http;
    protected url: string;
    private host = HOST_PATH;
    private host_api = HOST_API_PATH;

    protected _records: BehaviorSubject<any[]>;
    protected dataStore: {  // todos的内存“数据库”
        records: any[]
    };

    protected errorMessage: string;

    constructor(http: Http, path: string) {
        this.http = http;
        this.url = this.host_api + '/' + path;

        this.getConfigInfo().then(data => console.log(data));

        this.dataStore = {records: []};
        this._records = new BehaviorSubject<any[]>([]);
    }

    public get records() {
        return this._records.asObservable();
    }

    public getConfigInfo() {
        return this.http.get('assets/data/files.json')
            .toPromise()
            .then(res => res.json().data);
    }

    public getList() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        const searchParams = new URLSearchParams();
        //searchParams.set('offset', '1');
        //searchParams.set('rows', '20');
        //searchParams.set('sort', 'id');
        //searchParams.set('order', 'asc');

        return this.http.get(this.url, {search: searchParams, headers: headers})
            .map(response => {
                const records = response.json();
                this.updateStoreAndSubject(records);

                return response.json();
            });
    }

    public getListByPageInfo(offset, rows, total) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        const searchParams = new URLSearchParams();
        searchParams.set('offset', offset);
        searchParams.set('rows', rows);
        searchParams.set('total', total);

        return this.http.get(this.url + '/page', {search: searchParams, headers: headers})
            .map(response => {
                const records = response.json();
                this.updateStoreAndSubject(records);

                return response.json();
            });
    }

    public create(data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.url, JSON.stringify(data), {headers: headers})
            .map(res => {
                const resResult = <ResponseResult> res.json();
                this.dataStore.records = [...this.dataStore.records, resResult.data];
                this._records.next(Object.assign({}, this.dataStore).records);

                return <ResponseResult> res.json();
            });
    }

    public edit(data) {
        const i = this.getIndexOfRecords(data);
        const updatedRecord = Object.assign({}, data);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(this.url, JSON.stringify(data), {headers: headers})
            .map(res => {
                this.dataStore.records = [
                    ...this.dataStore.records.slice(0, i),
                    updatedRecord,
                    ...this.dataStore.records.slice(i + 1)
                ];
                this._records.next(Object.assign({}, this.dataStore).records);

                return <ResponseResult> res.json();
            });
    }

    public delete(data) {
        if (!data) {
            data = {id: '-1'};
        }

        const i = this.getIndexOfRecords(data);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.delete(this.url + '/' + data.id, {headers: headers})
            .map(res => {
                this.dataStore.records = [
                    ...this.dataStore.records.slice(0, i),
                    ...this.dataStore.records.slice(i + 1)
                ];
                this._records.next(Object.assign({}, this.dataStore).records);

                return <ResponseResult> res.json();
            });
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

    /**
     * 从dataStore中获取记录索引
     * @param data
     * @returns {number}
     */
    protected getIndexOfRecords(data) {
        const records = this.dataStore.records;
        for (let i = 0; i < records.length; i++) {
            if (data.id == records[i].id) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 更新dataStore并通知变化
     * @param records
     */
    protected updateStoreAndSubject(records) {
        this.dataStore.records = [...records];
        this._records.next(Object.assign({}, this.dataStore).records);
    }

}

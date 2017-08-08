import {Headers, Http, URLSearchParams} from '@angular/http';
import {HOST_API_PATH, HOST_PATH} from '../../utils/constant';
import {ResponseResult} from '../index';
//import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export abstract class BaseService {

    protected http: Http;
    protected url: string;
    private host = HOST_PATH;
    private host_api = HOST_API_PATH;

    protected _records: BehaviorSubject<any[]>;
    protected _message: BehaviorSubject<string>;
    protected dataStore: {
        records: any[],
        message: string
    };

    constructor(http: Http, path: string) {
        this.http = http;
        this.url = this.host_api + '/' + path;

        this.getConfigInfo().then(data => console.log(data));

        this.dataStore = {records: [], message: null};
        this._records = new BehaviorSubject<any[]>([]);
        this._message = new BehaviorSubject<string>(null);
    }

    public get records$() {
        return this._records.asObservable();
    }

    public set records(value: any[]) {
        this.dataStore.records = [...value];
        this._records.next(Object.assign({}, this.dataStore).records);
    }

    public get message$() {
        return this._message.asObservable();
    }

    public set message(value: string) {
        this.dataStore.message = value;
        this._message.next(Object.assign({}, this.dataStore).message);
    }

    public getConfigInfo() {
        return this.http.get('assets/data/files.json')
            .toPromise()
            .then(res => res.json().data);
    }

    /**
     * 获取列表
     * @returns {any}
     */
    public getList() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        const searchParams = new URLSearchParams();

        return Observable
            .create(observer => {

                //通过http从服务端获取数据
                this.http.get(this.url, {search: searchParams, headers: headers})
                    .map(response => response.json())
                    .subscribe(
                        data => {
                            this.records = data;

                            //设置返回Observable
                            observer.next(this.dataStore.records);
                            observer.complete();
                        },
                        error => this.handleError(observer, error),
                        () => console.log('getList Complete')
                    );
            });
    }

    /**
     * 获取列表--分页模式
     * @param offset
     * @param rows
     * @param total
     * @returns {any}
     */
    public getListByPageInfo(offset, rows, total) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        const searchParams = new URLSearchParams();
        searchParams.set('offset', offset);
        searchParams.set('rows', rows);
        searchParams.set('total', total);

        return Observable
            .create(observer => {

                //通过http从服务端获取数据
                this.http.get(this.url + '/page', {search: searchParams, headers: headers})
                    .map(response => response.json())
                    .subscribe(
                        data => {
                            this.records = data;

                            //设置返回Observable
                            observer.next(this.dataStore.records);
                            observer.complete();
                        },
                        error => this.handleError(observer, error),
                        () => console.log('getListByPageInfo Complete')
                    );
            });
    }

    /**
     * 新增单条记录
     * @param record
     * @returns {Observable<ResponseResult>}
     */
    public addItem(record): Observable<ResponseResult> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');


        return new Observable<ResponseResult>(observer => {
            let result: ResponseResult;

            //通过http从服务端获取数据
            this.http.post(this.url, JSON.stringify(record), {headers: headers})
                .map(res => <ResponseResult> res.json())
                .subscribe(
                    resResult => {
                        result = resResult as ResponseResult;
                        this.records = resResult.data;

                        //设置返回Observable
                        observer.next(result);
                        observer.complete();
                    },
                    error => this.handleError(observer, error),
                    () => console.log('create Complete')
                );
        });
    }

    /**
     * 编辑单条记录
     * @param record
     * @returns {Promise<PushSubscription>}
     */
    public editItem(record) {
        const i = this.getIndexOfRecords(record);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');


        return new Observable<ResponseResult>(observer => {
            let result: ResponseResult;

            //通过http从服务端获取数据
            this.http.put(this.url, JSON.stringify(record), {headers: headers})
                .map(res => <ResponseResult> res.json())
                .subscribe(
                    resResult => {
                        result = resResult;
                        const updatedRecord = Object.assign({}, resResult.data);
                        const records = [
                            ...this.dataStore.records.slice(0, i),
                            updatedRecord,
                            ...this.dataStore.records.slice(i + 1)
                        ];
                        this.records = records;

                        //设置返回Observable
                        observer.next(result);
                        observer.complete();
                    },
                    error => this.handleError(observer, error),
                    () => console.log('editItem Complete')
                );
        });

    }

    /**
     * 删除单条记录
     * @param record
     * @returns {Promise<PushSubscription>}
     */
    public deleteItem(record) {
        if (!record) {
            Observable.throw('record is null');
        }

        const i = this.getIndexOfRecords(record);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');


        return new Observable<ResponseResult>(observer => {
            let result: ResponseResult;

            //通过http从服务端获取数据
            this.http.delete(this.url + '/' + record.id, {headers: headers})
                .map(res => <ResponseResult> res.json())
                .subscribe(
                    resResult => {
                        result = resResult;
                        const records = [
                            ...this.dataStore.records.slice(0, i),
                            ...this.dataStore.records.slice(i + 1)
                        ];
                        this.records = records;

                        //设置返回Observable
                        observer.next(result);
                        observer.complete();
                    },
                    error => this.handleError(observer, error),
                    () => console.log('create Complete')
                );
        });

    }

    /**
     * 处理请求错误
     * @param observer
     * @param error
     */
    protected handleError(observer, error): void {
        console.log('请求服务失败:', error);

        let msg = '请求失败';
        if (error.status == 400) {
            msg = '请求参数正确';
        } else if (error.status == 404) {
            msg = '请检查路径是否正确';
        } else if (error.status == 500) {
            msg = '请求的服务器错误';
        }
        const result: ResponseResult = {status: -1, message: msg, data: null};
        this.message = msg;

        observer.next(result);
        observer.complete();
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

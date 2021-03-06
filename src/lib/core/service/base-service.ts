//import {DOCUMENT} from '@angular/platform-browser';
import {Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';
import {HOST_API_PATH, HOST_PATH} from '../../utils/constant';
import {ResponseResult} from '../model/response-result.model';
import 'rxjs/add/operator/map';
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

    public get importUrl() {
        return this.url + '/import';
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
                            console.log(data);
                            this.records = data.data;

                            this.handleSuccess(observer, this.dataStore.records);
                        },
                        error => this.handleError(observer, error, []),
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

                            this.handleSuccess(observer, this.dataStore.records);
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
                        console.log(resResult);
                        result = resResult as ResponseResult;

                        this.records = [...this.dataStore.records, resResult.data];

                        this.handleSuccess(observer, result);
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
        console.log(record);
        const i = this.getIndexOfRecords(record);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');


        return new Observable<ResponseResult>(observer => {
            let result: ResponseResult;

            //通过http从服务端获取数据
            this.http.put(this.url + '/' + record.id, JSON.stringify(record), {headers: headers})
                .map(res => <ResponseResult> res.json())
                .subscribe(
                    resResult => {
                        console.log(resResult);
                        result = resResult;
                        const updatedRecord = Object.assign({}, resResult.data);
                        const records = [
                            ...this.dataStore.records.slice(0, i),
                            updatedRecord,
                            ...this.dataStore.records.slice(i + 1)
                        ];
                        this.records = records;

                        this.handleSuccess(observer, updatedRecord);
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

                        this.handleSuccess(observer, result);
                    },
                    error => this.handleError(observer, error),
                    () => console.log('create Complete')
                );
        });

    }

    public export() {
        console.log('export');

        const headers = new Headers({'token': 'testToken'});
        const options = new RequestOptions({headers: headers, responseType: 3});
        const record = {id: 1};
        this.http.post(this.url + '/export', JSON.stringify(record), options).map(res => res.json()).subscribe(
            data => {
                this.saveExcel(data);
            }
        );
    }

    protected saveExcel(excel) {
        const exportFilename = 'test';

        const blob = new Blob([excel], {type: 'application/vnd.ms-excel'});

        if (window.navigator.msSaveOrOpenBlob) { // For IE:
            navigator.msSaveOrOpenBlob(blob, exportFilename + '.csv');
        } else {
            const objectUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                //link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('href', objectUrl);
                link.setAttribute('download', exportFilename + '.xls');
                link.click();
            } else {
                window.open(objectUrl);
            }
            document.body.removeChild(link);

            URL.revokeObjectURL(objectUrl);
        }
    }

    /**
     * 处理请求错误
     * @param observer
     * @param error
     */
    protected handleError(observer, error, data = null): void {
        console.log('请求服务失败:', error);

        let msg = '服务请求失败:';
        if (error.status == 400) {
            msg += '请求参数正确';
        } else if (error.status == 404) {
            msg += '请检查路径是否正确';
        } else if (error.status == 500) {
            msg += '请求的服务器错误';
        }
        const result: ResponseResult = {status: -1, message: msg, data: data};
        this.message = msg;

        observer.next(result);
        observer.complete();
    }

    /**
     * 请求服务处理成功统一处理函数
     * @param observer
     * @param error
     * @param {any} data
     */
    protected handleSuccess(observer, data = null, message = ''): void {
        console.log('请求服务成功:' + message);

        const result: ResponseResult = {status: 1, message: message, data: data};
        this.message = message;

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

import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';
import {BaseService} from '../../ng2-fuzhutech-common';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {ResponseResult} from '../../../lib/core/response-result-model';

@Injectable()
export class SomeDemoService extends BaseService {

    constructor(http: Http) {
        super(http, 'users');


        this.url = 'assets/data/sub-page-demo.json';
    }


    /*@Override*/
    addItem(data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.dataStore.records = [...this.dataStore.records, data];
        this._records.next(Object.assign({}, this.dataStore).records);

        return this.http.post(this.url, JSON.stringify(data), {headers: headers})
            .map(res => {
                const resResult = <ResponseResult> res.json();
                this.dataStore.records = [...this.dataStore.records, resResult.data];
                this._records.next(Object.assign({}, this.dataStore).records);

                return <ResponseResult> res.json();
            });
    }

    editItem(data) {
        const i = this.getIndexOfRecords(data);
        //const updatedTodo = Object.assign({}, todo, {completed: !todo.completed});
        const updatedRecord = Object.assign({}, data);
        console.log(i);
        this.dataStore.records = [
            ...this.dataStore.records.slice(0, i),
            updatedRecord,
            ...this.dataStore.records.slice(i + 1)
        ];
        this._records.next(Object.assign({}, this.dataStore).records);
        console.log(this.dataStore.records);


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

    deleteItem(data) {
        console.log(data);
        console.log(this.dataStore.records);
        if (!data) {
            data = {id: '-1'};
        }

        //const i = this.dataStore.records.indexOf(data);
        const i = this.getIndexOfRecords(data);
        console.log(i);
        this.dataStore.records = [
            ...this.dataStore.records.slice(0, i),
            ...this.dataStore.records.slice(i + 1)
        ];
        this._records.next(Object.assign({}, this.dataStore).records);

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


}

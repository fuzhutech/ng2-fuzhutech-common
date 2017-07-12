import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';
import {BaseService} from '../../ng2-fuzhutech-common';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class SomeDemoService extends BaseService {

    constructor(http: Http) {
        super(http, 'users');
    }

    /*@Override*/
    getList() {
        this.url = 'assets/showcase/data/files.json';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        const searchParams = new URLSearchParams();
        //searchParams.set('offset', '1');
        //searchParams.set('rows', '20');
        //searchParams.set('sort', 'id');
        //searchParams.set('order', 'asc');

        return this.http.get('assets/data/sub-page-demo.json', {search: searchParams, headers: headers})
            .map(response => response.json());
    }

}

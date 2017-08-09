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


        //this.url = 'assets/data/sub-page-demo.json';
        this.url = 'api/models';
    }

}

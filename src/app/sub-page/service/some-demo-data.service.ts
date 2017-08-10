/**
 * Created by fuzhutech on 2017/8/9.
 *
 * @license
 * Copyright www.fuzhutech.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.fuzhutech.com/license
 */

import {Injectable} from '@angular/core';

import {RequestMethod, Response, ResponseOptions, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {
    InMemoryDbService,
    createErrorResponse, emitResponse, HttpMethodInterceptorArgs,
    ParsedUrl, RequestInfo, STATUS
} from 'angular-in-memory-web-api';


import {SomeDemoModel} from '../model/some-demo.model';

@Injectable()
export class SomeDemoDataService implements InMemoryDbService {
    createDb() {
        const models: SomeDemoModel[] = [
            {
                'id': 1,
                'name': '扶竹',
                'createTime': 1495677045000,
                'lastModifyTime': 1495677045000
            },
            {
                'id': 2,
                'name': 'fuzhutech',
                'createTime': 1497360542000,
                'lastModifyTime': null
            },
            {
                'id': 3,
                'name': '扶竹技术',
                'createTime': 1497360545000,
                'lastModifyTime': 1497360550000
            }
        ];
        return {models};
        //return {persons: persons}
    }
}

/**
 * This is an example of a Hero-oriented InMemoryDbService with method overrides.
 */
@Injectable()
export class SomeDemoDataOverrideService extends SomeDemoDataService {

    // intercept response from the default HTTP method handlers
    responseInterceptor(response: ResponseOptions, reqInfo: RequestInfo) {
        const method = RequestMethod[reqInfo.req.method].toUpperCase();
        const body = JSON.stringify(response.body);
        console.log(`responseInterceptor: ${method} ${reqInfo.req.url}: \n${body}`);

        //if (body != null)
        response.body = Object.assign({status: 1, message: ''}, response.body);

        return response;
    }
}

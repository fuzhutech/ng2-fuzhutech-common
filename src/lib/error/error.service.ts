import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Http, Headers, Response} from '@angular/http';
import {HOST_API_PATH} from '../index';
import {FzErrorModel} from './error.model';

@Injectable()
export class ErrorService {

    private host_api = HOST_API_PATH;
    private _error: FzErrorModel;
    private _errorSubject: Subject<FzErrorModel> = new Subject<FzErrorModel>();

    public set currentError(error: FzErrorModel) {
        this._error = error;

        if (error) {
            this._errorSubject.next(this._error);
        } else {
            this._errorSubject.next(Object.assign({}));
            //this.authInfoSubject.next();
        }
    }

    public get currentError(): FzErrorModel {
        return this._error;
    }

    public get errorSubject(): Observable<FzErrorModel> {
        return this._errorSubject.asObservable();
    }

}

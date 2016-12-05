import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {ErrorService} from "../errors/error.service";
import {AppConfig} from "../app.config";


/**
 * Created by Tzvika on 11/28/2016.
 */

@Injectable()
export class AuthService{
    private _domainUrl = AppConfig.getEnvironmentVariable('endPoint');

    constructor (private http: Http, private errorService: ErrorService){}
    signup(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type' : 'application/json'});
        console.log("signup this._domainUrl= " + this._domainUrl);
        return this.http.post(this._domainUrl + 'user', body, {headers:headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }
    signin(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type' : 'application/json'});
        console.log("signin this._domainUrl= " + this._domainUrl);
        return this.http.post(this._domainUrl + 'user/signin', body, {headers:headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }

    logout(){
        //erasing the token will remove the authentication
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null ;
    }

}
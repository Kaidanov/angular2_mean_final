import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {ErrorService} from "../errors/error.service";


/**
 * Created by Tzvika on 11/28/2016.
 */

@Injectable()
export class AuthService{
    constructor (private http: Http, private errorService: ErrorService){}
    signup(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post('https://kaidanov-angular2-mean.herokuapp.com/user', body, {headers:headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }
    signin(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post('https://kaidanov-angular2-mean.herokuapp.com/user/signin', body, {headers:headers})
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
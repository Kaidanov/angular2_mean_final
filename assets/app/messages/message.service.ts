import { Http, Response, Headers } from "@angular/http";
import {Injectable, EventEmitter} from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from "./message.model";
import {ErrorService} from "../errors/error.service";
import {AppConfig} from "../app.config";

@Injectable()
export class MessageService{
    private messages: Message[] = [];
    private _domainUrl = AppConfig.getEnvironmentVariable('endPoint');
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http , private errorService: ErrorService) {}

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
                        ? '?token=' + localStorage.getItem('token')
                        :  '';
        console.log("addMessage this._domainUrl= " + this._domainUrl);
        return this.http.post( this._domainUrl + 'message' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getMessages(){
        return this.http.get(this._domainUrl + 'message')
            .map((response: Response)=>{
                 const messages = response.json().obj;
                 let transformedMessages : Message[] = [];
                 for( let message of messages)
                 {
                     transformedMessages.push(
                         new Message(
                                     message.content,
                                     message.user.firstName ,
                                     message._id,
                                     message.user._id)
                     );
                 }
                 this.messages = transformedMessages;
                 return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    ///act as a middle man between message.component and the input component
    editMessage(message:Message){
            this.messageIsEdit.emit(message);
    }

    updateMessage(message:Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            :  '';
        console.log("updateMessage this._domainUrl= " + this._domainUrl);
        return this.http.patch(this._domainUrl + 'message/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) =>  response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    deleteMessage(message:Message){
        //find specific message and remove only it
        this.messages.splice(this.messages.indexOf(message),1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            :  '';
        console.log("deleteMessage this._domainUrl= " + this._domainUrl);
        return this.http.delete(this._domainUrl + 'message/' + message.messageId + token)
            .map((response: Response) =>  response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }



}
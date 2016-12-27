import {Http, Response, Headers} from "@angular/http";
import {Injectable, EventEmitter} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";

import {Message} from "./message.model";
import {ErrorService} from "../errors/error.service";
import {AppConfig} from "../app.config";

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    private maxMessageId: number = 0;
    private _domainUrl = AppConfig.getEnvironmentVariable('endPoint');
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService) {
    }

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        console.log("addMessage this._domainUrl= " + this._domainUrl);
        return this.http.post(this._domainUrl + 'message' + token, body, {headers: headers})
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

    getMessages() {
        console.log(this.messages);
        if (this.messages.length > 0) {
            this.maxMessageId = this.getMaxId();
        }
        console.log("this.messages = " + this.messages);
        //let maxMessage : Message  = this.messages.find(function(message){return message.messageAutoIncreamentId == maxMessageId});
        return Observable.interval(5000)
            .switchMap(() => this.http.get(this._domainUrl + 'message?maxMessageId=' + this.maxMessageId))
            .map((response: Response) => {
                const messages = response.json().obj;
                if (messages.length > 0) {
                    let transformedMessages: Message[] = [];
                    for (let message of messages) {
                        transformedMessages.push(
                            new Message(
                                message.content,
                                message.user.firstName,
                                message._id,
                                message.user._id,
                                message.messageAutoIncreamentId)
                        );
                    }
                    //only if we have new messages - concatinate to existing messages and set new max message id
                    // filter the primary message without the messageAutoIncreamentId data
                    this.messages = this.messages.concat(transformedMessages).filter(message => this.isMyNumber(message.messageAutoIncreamentId));
                    this.maxMessageId = this.getMaxId();
                    console.log(transformedMessages.length + " messages has been added to existing as a delta of data");
                }
                else {
                    console.log("No new messages from server");
                }
                return this.messages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    private isMyNumber(obj) {
        return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj);
    }


    private getMaxId() {
        return Math.max.apply(Math, this.messages.map(function (message) {
            return ( isNaN(message.messageAutoIncreamentId) ? 0 : message.messageAutoIncreamentId );
        }));
    }

    ///act as a middle man between message.component and the input component
    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        console.log("updateMessage this._domainUrl= " + this._domainUrl);
        return this.http.patch(this._domainUrl + 'message/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteMessage(message: Message) {
        //find specific message and remove only it
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        console.log("deleteMessage this._domainUrl= " + this._domainUrl);
        return this.http.delete(this._domainUrl + 'message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


}
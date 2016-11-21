import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from "./message.model";

@Injectable()
export class MessageService{
    private messages: Message[] = [];

    //getting the http pipeline to go to server
    constructor(private http: Http ) {}

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        //setting the observable
        //doesn't send a request yet until the subscribe exists
        //the subscribtion occus where it's needed..

        //map
        //gets the answers , removes the headers and translating the object
        // to js data object to work with
        //.catch(this.handleError);
        //catch
        //WE DON'T KNOW WHAT KIND OF OBJECT IT IS..
        return this.http.post('http://localhost:3000/message', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error:Response) => Observable.throw(error.json()));
    }

    getMessages(){
        return this.http.get('http://localhost:3000/message')
            .map((response: Response)=>{
                 const messages = response.json().obj;
                 let transformedMessages : Message[] = [];
                 for( let message of messages)
                 {
                     transformedMessages.push(new Message(message.content,'Dummy' , message.id,  null));
                 }
                 this.messages = transformedMessages;
                 return transformedMessages;
            })
            .catch((error:Response) => Observable.throw(error.json()));
    }

    deleteMessage(message:Message){
        //find specific message and remove only it
        this.messages.splice(this.messages.indexOf(message),1);
    }



}
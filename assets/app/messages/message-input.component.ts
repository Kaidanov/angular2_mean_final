import {Component} from "@angular/core";

import {MessageService} from "./message.service";
import {Message} from "./message.model";
/**
 * Created by Tzvika on 11/21/2016.
 */
@Component({
    selector: 'app-message-input',
    templateUrl : './message-input.component.html'
    //providers: [MessageService]   //connecting dependency injection only to this component
})
export class MessageInputComponent{
    constructor(private messageService: MessageService){}

    onSave(value:string){
        const message = new Message(value, "tzvika");
       this.messageService.addMessage(message);
   }
}
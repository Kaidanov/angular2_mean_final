import {Component} from "@angular/core";

import {MessageService} from "./message.service";
import {Message} from "./message.model";
import {NgForm} from "@angular/forms";
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

    onSubmit(form: NgForm){
      const message = new Message(form.value.content, 'tzvika');
      this.messageService.addMessage(message)
          .subscribe(
              data => console.log(data),
              error => console.error(error)
          );
      form.resetForm();
   }
}
import {Component, Input} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";


/**
 * Created by Tzvika on 11/21/2016.
 */
@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [`
                .author {
                    display: inline-block;
                    font-style: italic;
                    font-size: 12px;
                    width: 80%;
                }
                .config {
                    display: inline-block;
                    font-align: right;
                    font-size: 12px;
                    width: 19%;
                }
            ` ]
})
export class MessageComponent{
    ///enables the parent to send data to the child
    ///in html [message]="message" on the tag of the component
    @Input() message: Message;


    constructor(private messageService: MessageService){

    }

    onEdit(){
        this.messageService.editMessage(this.message);
    }

    onDelete()
    {
        this.messageService.deleteMessage(this.message)
            .subscribe(
                result => console.log(result)
            );
    }

}

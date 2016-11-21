import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Message} from "./message.model";


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
    ///event emitter passes the data to upper component
    @Output() editClicked = new EventEmitter<string>();

    onEdit(){
        ///from the child to the parent
        /// sends output to the upper component
        ///in html (editClicked)="message.content = $event" - event holds the data
        this.editClicked.emit("A new value");
    }

}

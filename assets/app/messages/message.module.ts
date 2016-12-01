import {NgModule} from "@angular/core";

import {MessagesComponent} from "./messages.component";
import {MessageListComponent} from "./message-list.component";
import {MessageComponent} from "./message.component";
import {MessageInputComponent} from "./message-input.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MessageService} from "./message.service";

/**
 * Created by Tzvika on 12/1/2016.
 */
@NgModule({
    declarations : [
        MessagesComponent,
        MessageListComponent,
        MessageComponent,
        MessageInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [MessageService]
})
export class MessageModule{

}
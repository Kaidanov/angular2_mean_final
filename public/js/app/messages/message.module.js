import { NgModule } from "@angular/core";
import { MessagesComponent } from "./messages.component";
import { MessageListComponent } from "./message-list.component";
import { MessageComponent } from "./message.component";
import { MessageInputComponent } from "./message-input.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MessageService } from "./message.service";
/**
 * Created by Tzvika on 12/1/2016.
 */
export var MessageModule = (function () {
    function MessageModule() {
    }
    MessageModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
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
                },] },
    ];
    /** @nocollapse */
    MessageModule.ctorParameters = [];
    return MessageModule;
}());
//# sourceMappingURL=message.module.js.map
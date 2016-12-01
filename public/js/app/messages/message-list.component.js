import { Component } from "@angular/core";
import { MessageService } from "./message.service";
/**
 * Created by Tzvika on 11/21/2016.
 */
export var MessageListComponent = (function () {
    function MessageListComponent(messageService) {
        this.messageService = messageService;
    }
    MessageListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.getMessages()
            .subscribe(function (messages) {
            _this.messages = messages;
        });
    };
    MessageListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-message-list',
                    template: "\n        <div class=\"col-md-8 col-md-offset-2\">\n            <app-message\n                   [message]=\"message\"\n                    *ngFor=\"let message of messages\"></app-message>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    MessageListComponent.ctorParameters = [
        { type: MessageService, },
    ];
    return MessageListComponent;
}());
//# sourceMappingURL=message-list.component.js.map
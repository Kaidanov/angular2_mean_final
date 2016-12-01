/**
 * Created by Tzvika on 11/21/2016.
 */
export var Message = (function () {
    //? - means optional
    function Message(content, username, messageId, userId) {
        this.content = content;
        this.username = username;
        this.messageId = messageId;
        this.userId = userId;
    }
    return Message;
}());
//# sourceMappingURL=message.model.js.map
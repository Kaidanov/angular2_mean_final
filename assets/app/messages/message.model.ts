/**
 * Created by Tzvika on 11/21/2016.
 */
export class Message{
    //class members
    content: string;
    username: string;
    messageId?: string;
    userId? : string;

    //? - means optional
    constructor(content:string,username:string, messageId?:string, userId?:string){
        this.content = content;
        this.username = username;
        this.messageId = messageId;
        this.userId = userId;

    }
}
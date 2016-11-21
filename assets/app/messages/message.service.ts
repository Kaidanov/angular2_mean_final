import {Message} from "./message.model";
/**
 * Created by Tzvika on 11/21/2016.
 */
export class MessageService{
    private messages: Message[] = [];

    addMessage(message:Message){
        this.messages.push(message);
        console.log(this.messages);
    }

    getMessages(){
        return this.messages;
    }

    deleteMessage(message:Message){
        //find specific message and remove only it
        this.messages.splice(this.messages.indexOf(message),1);
    }



}
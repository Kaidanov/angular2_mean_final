import {EventEmitter} from "@angular/core";
import {Error} from "./error.model";
/**
 * Created by Tzvika on 12/1/2016.
 */

export class ErrorService{
    errorOccurred = new EventEmitter<Error>();

    handleError(error:any){
        const errorData = new Error(error.title , error.error.message);
        this.errorOccurred.emit(errorData);
    }
}
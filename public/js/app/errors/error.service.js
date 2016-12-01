import { EventEmitter } from "@angular/core";
import { Error } from "./error.model";
/**
 * Created by Tzvika on 12/1/2016.
 */
export var ErrorService = (function () {
    function ErrorService() {
        this.errorOccurred = new EventEmitter();
    }
    ErrorService.prototype.handleError = function (error) {
        var errorData = new Error(error.title, error.error.message);
        this.errorOccurred.emit(errorData);
    };
    return ErrorService;
}());
//# sourceMappingURL=error.service.js.map
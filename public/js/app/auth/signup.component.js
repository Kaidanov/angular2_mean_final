import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
/**
 * Created by Tzvika on 11/21/2016.
 */
export var SignupComponent = (function () {
    function SignupComponent(authService) {
        this.authService = authService;
    }
    SignupComponent.prototype.onSubmit = function () {
        var user = new User(this.myForm.value.password, this.myForm.value.email, this.myForm.value.firstName, this.myForm.value.lastName);
        this.authService.signup(user)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
        //refreshing after submit - cleaning the inputs
        this.myForm.reset();
    };
    SignupComponent.prototype.ngOnInit = function () {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
            ]),
            password: new FormControl(null, Validators.required)
        });
    };
    SignupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-signup',
                    templateUrl: './signup.component.html'
                },] },
    ];
    /** @nocollapse */
    SignupComponent.ctorParameters = [
        { type: AuthService, },
    ];
    return SignupComponent;
}());
//# sourceMappingURL=signup.component.js.map
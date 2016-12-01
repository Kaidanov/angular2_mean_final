import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
export var SigninComponent = (function () {
    function SigninComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    SigninComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new User(this.myForm.value.password, this.myForm.value.email);
        this.authService.signin(user)
            .subscribe(function (data) {
            //can store in local storage , cookies
            // google angular2 + cookies
            //will persist if the browser is closed
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            _this.router.navigateByUrl('/'); //redirect
        }, function (error) { return console.error(error); });
        //refreshing after submit - cleaning the inputs
        this.myForm.reset();
    };
    SigninComponent.prototype.ngOnInit = function () {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
            ]),
            password: new FormControl(null, Validators.required)
        });
    };
    SigninComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-Signin',
                    templateUrl: './Signin.component.html'
                },] },
    ];
    /** @nocollapse */
    SigninComponent.ctorParameters = [
        { type: AuthService, },
        { type: Router, },
    ];
    return SigninComponent;
}());
//# sourceMappingURL=signin.component.js.map
import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
/**
 * Created by Tzvika on 11/21/2016.
 */
export var AuthenticationComponent = (function () {
    function AuthenticationComponent(authService) {
        this.authService = authService;
    }
    AuthenticationComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    AuthenticationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-authentication',
                    template: "\n        <header class=\"row spacing\">\n            <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-tabs\">\n                    <li><a routerLinkActive=\"active\" [routerLink] = \"['signup']\" >Signup</a></li>\n                    <li><a routerLinkActive=\"active\" *ngIf=\"!isLoggedIn()\" [routerLink] = \"['signin']\">Signin</a></li>\n                    <li><a routerLinkActive=\"active\" *ngIf=\"isLoggedIn()\" [routerLink] = \"['logout']\">Logout</a></li>\n                </ul>\n            </nav>\n        </header>\n        <div class=\"row spacing\">\n            <router-outlet>  </router-outlet>\n        </div>\n"
                },] },
    ];
    /** @nocollapse */
    AuthenticationComponent.ctorParameters = [
        { type: AuthService, },
    ];
    return AuthenticationComponent;
}());
//# sourceMappingURL=authentication.component.js.map
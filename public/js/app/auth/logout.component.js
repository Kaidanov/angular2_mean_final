import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
/**
 * Created by Tzvika on 11/21/2016.
 */
export var LogoutCompnent = (function () {
    function LogoutCompnent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    LogoutCompnent.prototype.onLogout = function () {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    };
    LogoutCompnent.decorators = [
        { type: Component, args: [{
                    selector: 'app-logout',
                    template: "\n                <div class=\"col-md-8 col-md-offset-2\">\n                    <button class=\"btn btn-danger\" (click)=\"onLogout()\" > Log out</button>\n            </div>\n"
                },] },
    ];
    /** @nocollapse */
    LogoutCompnent.ctorParameters = [
        { type: AuthService, },
        { type: Router, },
    ];
    return LogoutCompnent;
}());
//# sourceMappingURL=logout.component.js.map
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SigninComponent } from "./signin.component";
import { SignupComponent } from "./signup.component";
import { LogoutCompnent } from "./logout.component";
import { authRouting } from "./auth.routing";
/**
 * Created by Tzvika on 12/1/2016.
 */
export var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SigninComponent,
                        SignupComponent,
                        LogoutCompnent
                    ],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        authRouting
                    ]
                },] },
    ];
    /** @nocollapse */
    AuthModule.ctorParameters = [];
    return AuthModule;
}());
//# sourceMappingURL=auth.module.js.map
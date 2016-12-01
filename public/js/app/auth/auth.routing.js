import { RouterModule } from "@angular/router";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutCompnent } from "./logout.component";
/**
 * Created by Tzvika on 11/21/2016.
 */
//all sub path should be starting with auth so no / beforre the routing here
var AUTH_ROUTES = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutCompnent },
];
export var authRouting = RouterModule.forChild(AUTH_ROUTES);
//# sourceMappingURL=auth.routing.js.map
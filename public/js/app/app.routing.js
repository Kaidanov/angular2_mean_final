import { RouterModule } from "@angular/router";
import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
/**
 * Created by Tzvika on 11/21/2016.
 */
var APP_ROUTES = [
    //pathMatch only matches the really empty route
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];
//exporting for getting our custom routing
export var routing = RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routing.js.map
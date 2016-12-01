import {Routes, RouterModule} from "@angular/router";

import {MessagesComponent} from "./messages/messages.component";
import {AuthenticationComponent} from "./auth/authentication.component";


/**
 * Created by Tzvika on 11/21/2016.
 */
const APP_ROUTES: Routes = [
    //pathMatch only matches the really empty route
    {path : '' , redirectTo: '/messages' , pathMatch: 'full' },  // goto to localhost (to your domain) and not to #
    {path : 'messages' , component: MessagesComponent },
    {path : 'auth' , component: AuthenticationComponent , loadChildren: './auth/auth.module#AuthModule'}
];

//exporting for getting our custom routing
export const routing = RouterModule.forRoot(APP_ROUTES);
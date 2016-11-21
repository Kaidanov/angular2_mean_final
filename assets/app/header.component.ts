import {Component} from "@angular/core";
/**
 * Created by Tzvika on 11/21/2016.
 */
@Component({
    selector :'app-header',
    template: `
                <header class="row">
                    <nav class="col-md-8 col-md-offset-2">
                        <ul class="nav nav-pills">
                           <!-- (li>a)*2) -->
                           <li routerLinkActive="active"><a [routerLink]="['/messages']" >Messenger</a></li>
                           <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
                        </ul>
                    </nav>
                </header>
`
})
export class HeaderComponent{

}
# angular2_nodejs_connection
Seeder of all levels to work with Node.js Express with MongoDb and Angular2 - each branch different stage.  Connecting Angularjs with nodejs

  <h3> [Demo] (https://kaidanov-angular2-mean.herokuapp.com/messages)  </h3> 



# Node.js  
Download node.js 
https://nodejs.org/en/download/
Now we can use npm - node package manager -
http://blog.npmjs.org/post/85484771375/how-to-install-npm



First Command Line run to run node.js server
```
npm run build  
```

Second Command Line to run the angular client ( views of node for now)
```
npm start
```


# MongoDB  
Download MongoDB 
https://www.mongodb.com/download-center?jmp=nav#community
And install

To use MongoDB after installation add packages
```
	Ø npm install --save mongoose
	Ø npm install mongoose-unique-validator   (--this one is for unique fields)
```

For running MongoDB server
for me it worked specificly with --dbpath "e:\data\db" only
```
cd E:\MongoDB\Server\3.2\bin
E:\MongoDB\Server\3.2\bin>mongod.exe --dbpath "e:\data\db"
```

You can also see the port the mongo is working on and init in node.js accordingly 
//connecting to mongodb
//from running server gather the port
//creating the db if not existing
```javascript
mongoose.connect('localhost:27017/node-angular');
```

For running MongoDB client ( just to check the validity of our data - usually will be accessed trhoough the node.js code)
```
cd E:\MongoDB\Server\3.2\bin
E:\MongoDB\Server\3.2\bin>mongo.exe 
```
Can check through the client using those commands :
```
	Ø use node-angular  //swithes to dn node-angular
	Ø show collections //instead of tables
	Ø db.messages.find() //gets the data of the tables/collections
```

Example of getting data from MongDB in Node.js 

..\routes\app.js
```javascript
router.get('/', function (req, res, next) {
    User.findOne({}, function(err, doc){
       if(err)
       {
           return res.send('Error!');
       }
       res.render('node', {email: doc.email});
    });
});
```


# Angular 2  

**_Angular2_**  
**1.Property Binding**   
Connecting to  
- DOM Properties (e.g. value, hidden)
- Directive Properties (e.g. ngStyle
- Component Properties
```
 [property] = "expression"
```
For instance 
``` 
  in Typescript
  @Input('Alias') propertyName
  
  In HTML
  <my-component [propertyName] = "expression"> </my-component>
```

**2.Event Binding**  
Connecting to   
- User/DOM events (e.g. click, mouseover..)
- Directive Events
- Components Events
```
 (event) = "expression"
```
For Instance
``` 
  in Typescript
  @Output('Alias') eventName
  
  In HTML
  <my-component (eventName) = "expression"> </my-component>
```

Directives use 'selector' to let Angular2 know which parts of the HTMLl code represent instructions
like ``*ngIf``` or  ```my-component```
``` HTML
<section  *ngIf = "condition">
<h1> Hi </h1>
</section>

<my-component> </my-component>
```


** Creating dynamic color toggle **  
In the compnenet define a member color with initial color
and at the html add this
``` HTML
<article class="panel panel-default" [ngStyle]="{backgroundColor:color}" (mouseenter)="color = 'green'" (mouseleave)="color = 'red'">
</article>
```

[ngStyle] - gives to backgroundColor the initialized value of the member of the component named color  
(mouseenter) (mouseleave) - events changing the color by event and therefore updating the backgroundColor  


** Set value reference to local control and pass it to a function back to Component **   
 #input is sending it's value from html to onSave function without extra parameters. 
``` Html
<div class="col-md-8 col-md-offset-2">
    <div class="form-group">
        <label for="content" >
            <input type="text" id="content" class="form-control" #input>
        </label>
    </div>
    <button class="btn btn-primary" type="submit" (click)="onSave(input.value)">Save</button>
</div>
```
In TS we know what we are waiting for - value of type string. 
``` Javascript
import {Component} from "@angular/core";
/**
 * Created by Tzvika on 11/21/2016.
 */
@Component({
    selector: 'app-message-input',
    templateUrl : './message-input.component.html'
})
export class MessageInputComponent{
    onSave(value:string){
       console.log(value);
   }
}
```

 
** Services  **  
Used for reuse in different components privately for them or can be approached by the whole application through the most upper in hierarchy AppComponent  .
We can provide service on the app level or more specificaly per component when needed.
```
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService]

})
export class AppComponent {

}
```

Then in any component you can just   
1. import 
2. use it
```
import {MessageService} from "./message.service";
```


```
export class MessageComponent{
    ///enables the parent to send data to the child
    ///in html [message]="message" on the tag of the component
    @Input() message: Message;
    ///event emitter passes the data to upper component
    @Output() editClicked = new EventEmitter<string>();

    constructor(private messageService: MessageService){

    }

    onEdit(){
        ///from the child to the parent
        /// sends output to the upper component
        ///in html (editClicked)="message.content = $event" - event holds the data
        this.editClicked.emit("A new value");
    }

    onDelete()
    {
        this.messageService.deleteMessage(this.message);
    }

}
```

** Using Forms **      
Create a wrapper of a form , define a local variable inside and reffer it to the object of form created by angular for you
``` HTML 
 <div class="col-md-8 col-md-offset-2">
    <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <div class="form-group">
            <label for="content" >Content</label>
             <input
                     type="text"
                     id="content"
                     class="form-control"
                     ngModel
                     name="content"
                     required>

        </div>
        <button class="btn btn-primary" type="submit" >Save</button>
    </form>
</div>
```
Inside the component
``` Typescript
export class MessageInputComponent{
    constructor(private messageService: MessageService){}

    onSubmit(form: NgForm){
      const message = new Message(form.value.content, "tzvika");
      this.messageService.addMessage(message);
      form.resetForm();
   }
}
```
If the input is empty submitted it will find the added by angular classes and show it with red borders.
``` CSS
	input.ng-invalid.ng-touched {
	  border: 1px solid red;
	}

```

** Routing **
Setting custom routing   
1. pathMatch: `'full'` making the interpretation of the full path . good for empty path  
2. setting `'/messages'` with a slash will take you to the `domain_path/your_route` and not relative  
3. for module to take our routes we need to export them, therefore - `export const routing` 


``` Javascript
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
    {path : 'auth' , component: AuthenticationComponent }
];

//exporting for getting our custom routing
export const routing = RouterModule.forRoot(APP_ROUTES);
```

** The HTML Component part **  
1. `routerLinkActive="active"` - sets the link inside the li as active, adding style automatically
2. `[routerLink]="['/messages']"`  - sets the same way as in routiing full path relative to your domain
``` HTML
		<header class="row">
                    <nav class="col-md-8 col-md-offset-2">
                        <ul class="nav nav-pills">
                           <!-- (li>a)*2) -->
                           <li routerLinkActive="active"><a [routerLink]="['/messages']" >Messenger</a></li>
                           <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
                        </ul>
                    </nav>
                </header>
```

** Child routing **
For sub routing we can define new file of rooutes and add it as children 
No slash here because it's relative to it's parent auth 
So it's `domain_name/auth/your_route`
```
//all sub path should be starting with auth so no / beforre the routing here
export const AUTH_ROUTES: Routes =[
    {path: '' , redirectTo: 'signup' , pathMatch: 'full'},
    {path: 'signup', component:SignupComponent},
    {path: 'signin', component:SigninComponent},
    {path: 'logout', component:LogoutCompnent},
];

```
And then in the upper routing we are connecting the exporting children routes
```
 {path : 'auth' , component: AuthenticationComponent , children: AUTH_ROUTES}
 
 ```

** ReactiveFormsModule - creating your own forms approach **

Don't forget to connect the ReactiveFormsModule in the app.module.ts
```
   imports: [BrowserModule, FormsModule, routing , ReactiveFormsModule],
```

Creating the form in the component.
``` JS
export class SignupComponent implements OnInit{
    myForm: FormGroup;

    onSubmit()
    {
        console.log(this.myForm);
    }
    ngOnInit(){
        this.myForm = new FormGroup({
           firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}
```

And in HTML
``` HTML
<div class="col-md-8 col-md-offset-2">
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" class="form-control" formControlName="firstName">
        </div>
        <div class="form-group">
            <label for="lastName">First Name</label>
            <input type="text" id="lastName" class="form-control" formControlName="lastName">
        </div>
        <div class="form-group">
            <label for="email">First Name</label>
            <input type="email" id="email" class="form-control" formControlName="email">
        </div>
        <div class="form-group">
            <label for="password">First Name</label>
            <input type="password" id="password" class="form-control" formControlName="password">
        </div>
        <button class="btn btn-primary" type="submit"></button>
    </form>
</div>
```

** Important - 
You can approach the form from component without sending over the object. It recognizes it's structure because it is defined there.  
You should adjust the form saying you are using your own -  [formGroup]="myForm"  
And you shoud connect the fields inside to the formControlName, for instance   **  
``` html 
<input type="text" id="firstName" class="form-control" formControlName="firstName">
```


![Alt text](https://github.com/Kaidanov/angular2_nodejs_connection/blob/Ready_frontend/Ang2_node.jpg "Ang2 node.js relationship")

![Alt text](https://github.com/Kaidanov/angular2_nodejs_connection/blob/Ready_frontend/ObservableAng2_1.jpg "Observable Ang2")




** Authentication **

for password encrytion on the node.js side
npm install --save bcryptjs

password : bcrypt.hashSync(req.body.password, 10), 
//salt - the secon param  is the number of rounds to encrypt, how strong it is. you can't decrypt it. It's one way encryption


JWT - creating a token for authentication check
npm install --save jsonwebtoken

we use expiresIn to define the time of validity of the token


** Deploy ** 
https://mlab.com/ enables to create mongodb db for free
https://dashboard.heroku.com/ enables you to free host the code - client and server - recognizes the node.js server
or 
AWS

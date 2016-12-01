import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "./user.model";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-Signin',
    templateUrl: './Signin.component.html'
})
export class SigninComponent{
    myForm: FormGroup;

    constructor(private authService: AuthService , private router: Router){}
    onSubmit()
    {
        const user = new User(
            this.myForm.value.password,
            this.myForm.value.email);

        this.authService.signin(user)
            .subscribe(
                data => {
                    //can store in local storage , cookies
                    // google angular2 + cookies
                    //will persist if the browser is closed
                    localStorage.setItem('token' ,  data.token);
                    localStorage.setItem('userId' ,  data.userId);
                    this.router.navigateByUrl('/'); //redirect
                },
                error => console.error(error)
            );
        //refreshing after submit - cleaning the inputs
        this.myForm.reset();
    }
    ngOnInit(){
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}
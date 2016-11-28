import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {User} from "./user.model";
/**
 * Created by Tzvika on 11/21/2016.
 */
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
    myForm: FormGroup;

    constructor(private authService: AuthService){}

    onSubmit()
    {
        const user = new User(
            this.myForm.value.password,
            this.myForm.value.email,
            this.myForm.value.firstName,
            this.myForm.value.lastName);

        this.authService.signup(user)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        //refreshing after submit - cleaning the inputs
        this.myForm.reset();
    }
    ngOnInit(){
        this.myForm = new FormGroup({
           firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}

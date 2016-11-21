import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-Signin',
    templateUrl: './Signin.component.html'
})
export class SigninComponent{
    myForm: FormGroup;

    onSubmit()
    {
        console.log(this.myForm);
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
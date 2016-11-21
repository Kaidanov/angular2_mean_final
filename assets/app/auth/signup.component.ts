import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
/**
 * Created by Tzvika on 11/21/2016.
 */
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
    myForm: FormGroup;

    onSubmit()
    {
        console.log(this.myForm);
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

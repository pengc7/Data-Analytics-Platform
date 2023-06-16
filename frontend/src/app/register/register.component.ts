import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements  OnInit{
  registerFormInstance!: FormGroup;
  isRegistered: boolean|undefined;
  regFailed:boolean=false;
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) {
  }

  static passwordValidator({value: {password, confirmPassword}}:FormGroup): null| {passwordNotMatch:string} {
    return password === confirmPassword? null: {passwordNotMatch: 'Password and confirmPassword do not match!'};
  }

  ngOnInit(){
    this.registerFormInstance = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', Validators.minLength(3)],
        confirmPassword: ['', Validators.minLength(3)]
      }, {validators: [RegisterComponent.passwordValidator]})
    })
  }

  register(): void{
    const user = {username: this.registerFormInstance.get('username')?.value,
    password: this.registerFormInstance.get('passwordGroup')!.get('password')?.value};
    this.auth.register(user)
      .subscribe(res=>{
        if (res.success) {
          this.isRegistered = true;
          this.router.navigate(['/login']).catch();
        } else {
         this.regFailed=true;
         console.log(res, this.regFailed)
        }
      })
  }
}

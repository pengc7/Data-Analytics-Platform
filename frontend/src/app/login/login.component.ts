import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  constructor(private authService: AuthService,
              private router: Router) {
  }
  submit(loginForm: NgForm):void{
    const user = loginForm.value;
    this.authService.login(user)
      .subscribe(res=>{
        {
          console.log(res);
            this.authService.user = res.user;
            this.authService.setStatus(true);
            if (res.user.types!.findIndex(t=>t.type==='admin')>-1) {
              this.router.navigate(['/admin']).catch();
            }
           else { this.router.navigate(['/profiles']).catch();
          }}
      })
  }


}

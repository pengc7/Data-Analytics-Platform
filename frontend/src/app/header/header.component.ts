import {ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/user.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  title = "Alohomora";
  isLoggedIn: boolean=false;
  isAdmin: boolean|undefined;
  constructor(public authService: AuthService,
              private router:Router
              ) {

    this.authService.getStatus()
      .subscribe(res=>{this.isLoggedIn= res;
        if (this.isLoggedIn && this.authService.user) {this.isAdmin = this.authService.user.types!.findIndex(t=>t.type==='admin')>-1;
        console.log('isAdmin',this.isAdmin)};
    })
  }
  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
      .subscribe(res=>{
        res.success && (this.authService.user=null);
        this.isLoggedIn=false;
        this.isAdmin = false;
        this.router.navigate(['/home']).catch();
      });
  }
}


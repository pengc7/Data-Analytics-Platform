import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PremiumGuard implements CanActivate {

  isPremium: boolean|undefined;
  constructor(private auth: AuthService,
              private router: Router
              ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isPremium = this.auth.user? this.auth.user.types!.findIndex(t=>(t.type==='premium'||t.type==='admin'))>-1 : false;
    !this.isPremium && this.router.navigate(['/upgrade']).catch();
    return this.isPremium;
  }
}

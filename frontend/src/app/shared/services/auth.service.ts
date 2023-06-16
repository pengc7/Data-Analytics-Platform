import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User|null=null;
  private authStatus = new BehaviorSubject(false);
  constructor(private httpClient: HttpClient) {
  this.checkLogin()
    .subscribe(res=>{
      this.authStatus.next(res.success);
      this.user = res.user;
  });
  }

  checkLogin(): Observable<{ success: boolean, user: User }> {
    return this.httpClient.get<{ success: boolean, user: User }>(
      `${environment.api_url}/checklogin`,
      {withCredentials: true});
  }

  logout(): Observable<{success: boolean}>{
    this.authStatus.next(false);
    return this.httpClient.get<{success: boolean}>(
      `${environment.api_url}/logout`,
      {withCredentials: true}
    );
 }

  login(user:{username:string, password:string}): Observable<{success: boolean, user:User}>{
    const userFormData = new HttpParams()
      .append('username', user.username)//for username
      .append('password',user.password);
    return this.httpClient.post<{success: boolean, user:User}>(
      `${environment.api_url}/login`,
      userFormData,
      {withCredentials: true}
    );
  }

  register(user:User): Observable<{success: boolean, user:User}>{
    return this.httpClient.post<{success: boolean, user:User}>(
      `${environment.api_url}/users/register`,
      user
    )
  }

  update(user: User): Observable<{success: boolean, user:User}>{
    return this.httpClient.put<{success: boolean,user:User}>(
      `${environment.api_url}/users`,
        user,
{withCredentials: true}
  )
}
  setStatus(status: boolean){
    this.authStatus.next(status);
  }

  getStatus() {
    return this.authStatus.asObservable();
  }

}

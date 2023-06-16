import {Injectable} from "@angular/core";
import {Msg} from "../models/msg.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post.model";
import {environment} from "../../../environments/environment";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService{

  constructor(private httpClient: HttpClient) {
  }
  getAllMsg(): Observable<Msg[]|undefined>{
      return this.httpClient.get<Msg[]>(`${environment.api_url}/messages`,
        {withCredentials: true})
    }

  putMsg(msg: Msg): Observable<{success: boolean}>{
      return this.httpClient.post<{success: boolean, msg:Msg}>(
        `${environment.api_url}/messages`,
        msg, {withCredentials:true});
  }

  deleteMsg(id: number): Observable<{success: boolean}>{
    return this.httpClient.delete<{success: boolean}>(
      `${environment.api_url}/messages`,
      {withCredentials:true, body:id});
  }

  handleMsg(id: number): Observable<{success: boolean}>{
    return this.httpClient.post<{success: boolean, id: number}>(
      `${environment.api_url}/messages/handle`,
      id, {withCredentials:true})
  }


}
